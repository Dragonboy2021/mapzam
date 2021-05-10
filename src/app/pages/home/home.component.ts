import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  // userSignedIn$ = this.auth.userSignedIn$;
  constructor(public auth: AuthService) { 
  }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut().subscribe(data => {
      if (data.success) {
        localStorage.clear();
        this.auth.userSignedIn$.next(false);
      }
    });
  }
}
