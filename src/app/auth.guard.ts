import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<any> {
    return this.auth.userSignedIn$.pipe(
      map((data:any) => {
        if (data) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }
  
}
