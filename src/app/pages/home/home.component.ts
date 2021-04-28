import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { 

  }

  ngOnInit(): void {
    this.auth.authToken().subscribe((data:any) => {
      console.log(data)
    })
  }

  logOut() {
    this.auth.logOut().subscribe(data => {
      if (data.success) {
        localStorage.clear();
      }
    });
  }
}
