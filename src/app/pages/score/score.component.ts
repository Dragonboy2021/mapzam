import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from '@core/services/country.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.sass']
})
export class ScoreComponent implements OnInit, OnDestroy{
  req: any;
  displayedColumns: string[] = ['position', 'score', 'user', 'date'];
  dataSource = [];
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.req = this.countryService.quiz_scores().subscribe((data:any) => {
      this.dataSource = data;
    })
  }

  ngOnDestroy(): void {
    this.req.unsubscribe();
  }
}
