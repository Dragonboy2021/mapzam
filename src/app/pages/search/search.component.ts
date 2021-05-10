import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../../country.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  country: any;
  error: boolean = false;
  flag: any;
  searchForm: FormGroup;
  imagesUrl: string[] = [];
  center:any;
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(public fb: FormBuilder, private countryService: CountryService) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required]]
    })
  }

  get f() {return this.searchForm.controls;}

  onSubmit() {
    if (this.searchForm.valid) {
      const search = this.searchForm.value.search;
      this.country = this.countryService.searchCountry(search);
      if (this.country) {
        this.error = false;
        this.imagesUrl = []; // clear images
        this.markerPositions = []; // clear markers
        // Add flag
        this.flag = "https://flagcdn.com/h240/" + this.country.cca2.toLowerCase() + '.png';
        // Add Google Map
        const latLng = this.country.latlng;
        this.center = new google.maps.LatLng(latLng[0],latLng[1]);
        this.markerPositions.push({lat: latLng[0], lng:latLng[1]});
        // Add Pexel Images
        this.countryService.imageSearch(search).subscribe((data: any) => {
          const photos = data.photos;
          photos.forEach((photo:any) => {
            this.imagesUrl.push(photo.src.medium); //select medium size photo
          });
        });
      } else {
        // Show error message
        this.error = true;
      }
    }
  }

}
