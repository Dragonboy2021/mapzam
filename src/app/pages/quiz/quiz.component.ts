import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../country.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements OnInit {
  quizForm: FormGroup;
  imagesUrl: string[] = [];
  center: any;
  flag: any;
  flag2: any;
  capital: any;
  markerPositions: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    styles: [
      { 
        featureType: 'all',
        elementType: 'labels',
        stylers: [
          {visibility: "off"}]
      }
    ]
  }
  owlOptions: OwlOptions = {
    autoHeight: true
  };

  constructor(public fb: FormBuilder, private countryService: CountryService,
    private router: Router) { 
    this.quizForm = this.fb.group({
      q_one: [''],
      q_two: [''],
      q_three: [''],
      q_four: ['']
    })
  }

  ngOnInit(): void {
    const countries = this.countryService.quiz();
    this.setAnswers(countries);
    this.flag = this.countryService.flag(countries[0]); // Question 1 //
    this.capital = countries[1].capital; // Question 2 //
    this.flag2 = this.countryService.flag(countries[2]); // Question 3 //
    // Question 4 //
    const latLng = countries[3].latlng;
    this.center = new google.maps.LatLng(latLng[0],latLng[1]);
    this.markerPositions.push({lat: latLng[0], lng:latLng[1]});
  }

  onSubmit() {
    this.countryService.quiz_form = this.quizForm.value;
    this.countryService.answered_status = true;
  }

  private setAnswers(countries:any) {
    this.countryService.answers.q_1 = countries[0].name.common;
    this.countryService.answers.q_1 = countries[1].name.common;
    this.countryService.answers.q_1 = countries[2].name.common;
    this.countryService.answers.q_1 = countries[3].name.common;
  }
}
