import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<any> {
    return this.auth.userSignedIn$.pipe(
      map((data:any) => {
        if (!data) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    )
  }
  
}
