import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
const Countries = require('Countries-Api');
const max_id_countries = 248; // max id number of Countries API //
const max_num_quiz = 4; // number of quizzes //


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  answered_status = false;
  quiz_form: any;
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

  // Flagpedia //
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
