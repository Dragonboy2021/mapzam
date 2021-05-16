import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
const Countries = require('Countries-Api');
const max_id_countries = 248; // max id number of Countries API //
const max_num_quiz = 4; // number of quizzes //


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  answered_status = false;
  user_answers: any;
  answers = {
    q_1: '',
    q_2: '',
    q_3: '',
    q_4: ''
  }

  constructor(private http: HttpClient) { }

  private getRandomNumber() {
    return Math.floor(Math.random() * max_id_countries) + 1;
  }

  quiz() { 
    const countries = [];
    for(let i=1; i<=max_num_quiz; i++) {
      const country = Countries.findById(this.getRandomNumber());
      countries.push(country.data[0]);
    }
    return countries;
  }

  quiz_scores(): Observable<any> {
    return this.http.get(environment.apiBase + '/api/scores');
  }

  searchCountry(search: string) {
    if (search) {
      const countryData = Countries.findByName(search);
      if (countryData.statusCode === 200) {
        return countryData.data[0];
      }
      else {
        return false;
      }
    }
  }

  calc_answer(quiz_answers:any, user_answers:any) {
    const result:any = [];
    Object.entries(quiz_answers).map((answer, index) => {
      const data: any  = {};
      data.position = index + 1;
      data.answer = answer[1];
      Object.entries(user_answers).map(user_answer => {
        if (user_answer[0] === answer[0]) {
          data.user_answer = user_answer [1];
          if (answer[1] === user_answer[1]) {
            data.result = 'Correct';
          } else {
            data.result = 'Wrong';
          }
        }
      })
      result.push(data);
    });
    return result;
  }

  calc_score(result:any) {
    const score = { points: 0, percentage: 0}
    result.map((data:any) => {
      if (data.result === 'Correct') {
        score.points += 1
      }
    })
    score.percentage = score.points / max_num_quiz;
    return score;
  }

  // Return Flag image from Flagpedia //
  flag(country: any) {
    return "https://flagcdn.com/h240/" + country.cca2.toLowerCase() + '.png';
  }

  // Pexel Image Search //
  imageSearch(search: string) {
    return this.http.get('https://api.pexels.com/v1/search/?query=' + search + 
      '&per_page=10', this.httpOptions); // Display 10 images //
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.pexelApi!
    })
  };

}
