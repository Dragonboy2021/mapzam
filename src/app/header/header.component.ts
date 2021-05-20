import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logOut().subscribe((data) => {
      if (data.success) {
        localStorage.clear();
        this.auth.userSignedIn$.next(false);
        this.router.navigateByUrl('');
      }
    })
  }
}
