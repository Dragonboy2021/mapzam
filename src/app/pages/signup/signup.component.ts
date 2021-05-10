import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../confirmed.validators';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  error: boolean = false;

  constructor(public fb: FormBuilder, private auth: AuthService,
    private router: Router) { 
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]]
    },
    {validator: ConfirmedValidator('password', 'password_confirmation')})
  }

  get f() { return this.signUpForm.controls;}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
        .subscribe(
          (response:any) => {
            console.log(response)
            this.auth.setToken(response.headers.get('access-token'));
            this.auth.setClient(response.headers.get('client'));
            this.auth.setUid(response.headers.get('uid'));
            this.router.navigateByUrl('');
            this.auth.userSignedIn$.next(true);
          },
          (error) => {
            this.error = true;
         }
      )
    }
  }
}
