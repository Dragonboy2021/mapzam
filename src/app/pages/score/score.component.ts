import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../country.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.sass']
})
export class ScoreComponent implements OnInit {
  displayedColumns: string[] = ['position', 'score', 'user', 'date'];
  dataSource: any;
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.quiz_scores().subscribe((data:any) => {
      this.dataSource = data;
    })
  }

}
