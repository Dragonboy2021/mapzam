import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnDestroy {
  req: any;
  loginForm: FormGroup;
  error: boolean = false;

  constructor(public fb: FormBuilder, private auth: AuthService,
    private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get f() {return this.loginForm.controls;}

  onSubmit() {
    if (this.loginForm.valid) {
      this.req = this.auth.login(this.loginForm.value).subscribe((response:any) => {
        this.auth.setToken(response.headers.get('access-token'));
        this.auth.setClient(response.headers.get('client'));
        this.auth.setUid(response.headers.get('uid'));
        this.auth.userSignedIn$.next(true);
        this.router.navigateByUrl('');
      },
      (error:any) => {
        this.error = true;
      });
    }
  }
  ngOnDestroy() {
    this.req.unsubscribe();
  }
}
