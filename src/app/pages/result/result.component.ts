import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '@core/services/country.service';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit, OnDestroy {
  // req: any;
  displayedColumns: string[] = ['position', 'answer', 'user_answer', 'result'];
  dataSource: any;
  score = {
    points: 0,
    percentage: 0
  }

  constructor(private authService: AuthService, private countryService: CountryService, private router: Router) { 
    if (!this.countryService.answered_status) { // If user hasn't taken the quiz, return to home //
      this.router.navigateByUrl('');
    }
  }

  ngOnInit(): void {
    this.dataSource = this.countryService.calc_answer(this.countryService.answers, this.countryService.user_answers); // set table data //
    const data = this.countryService.calc_score(this.dataSource); // set score data //
    this.score.points = data.points;
    this.score.percentage = data.percentage;
  }

  onClick() {
    this.authService.score(this.score.points).subscribe((response:any) => {
      this.router.navigateByUrl('scores');
    },
    (error => {
      console.log(error)
    }))
  }

  ngOnDestroy() {
    this.countryService.user_answers = null;
    this.countryService.answered_status = false;
    // this.req.unsubscribe();
  }
}
