import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthService } from '@core/services/auth.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'mapzam';
  header: boolean = false;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.authToken().subscribe(
      (data: any) => {
        if (data.success) {
          this.auth.userSignedIn$.next(data);
        } else {
          this.auth.userSignedIn$.next(false);
        }
      },
      (error) => {
        this.auth.userSignedIn$.next(false);
      }
    );
    // Set Header Navbar //
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/') {
          this.header = false;
        } else {
          this.header = true;
        }
    });
  }

  ngOnInit() {
    this.loadScript();
  }
  
  // Add Google Map API // 
  private loadScript() {
    let node = document.createElement('script');
    node.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapApi}`;
    node.type = 'text/javascript';
    node.async = true;
    node.defer = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
