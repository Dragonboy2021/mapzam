import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'node:console';
import { CountryService } from '../../country.service';

// export interface PeriodicElement {
//   answer: string;
//   position: number;
//   user_answer: string;
//   result: string;
// }


// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, answer: 'France', user_answer: 'France', result: 'Correct'},
//   {position: 2, answer: 'Germany', user_answer: '', result: 'Wrong'},
//   {position: 3, answer: 'Japan', user_answer: 'Japan', result: 'Correct'},
//   {position: 4, answer: 'Indonesia', user_answer: 'Thailand', result: 'Wrong'}
// ];

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any;
  // answers = {
  //   q_1: 'France',
  //   q_2: 'Germany',
  //   q_3: 'Japan',
  //   q_4: 'Italy'
  // }
  // form_quiz = {
  //   q_1: '',
  //   q_2: 'Germany',
  //   q_3: 'Japan',
  //   q_4: 'Germany'
  // }
  score = {
    points: 0,
    percentage: 0
  }

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.dataSource = this.countryService.calc_answer(this.countryService.answers, this.countryService.user_answers); // set table data //
    const data = this.countryService.calc_score(this.dataSource); // set score data //
    this.score.points = data.points;
    this.score.percentage = data.percentage;
  }

}
