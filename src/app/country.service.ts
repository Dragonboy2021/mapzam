import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const Countries = require('Countries-Api');
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  searchCountry(search:any) {
    if (search) {
      const countryData = Countries.findByName(search);
      if (countryData.statusCode === 200) {
        return countryData.data[0];
      }
      else {
        return false
      }
    }
  }

  imageSearch(search:any) {
    return this.http.get('https://api.pexels.com/v1/search/?query=' + search +'&per_page=10', this.httpOptions);
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': environment.pexelApi!
    })
  };

}
