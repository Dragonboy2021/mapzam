import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000';

  userSignedIn$:Subject<boolean> = new Subject();

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  authHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'access-token': this.getToken() || '{}',
    'client': this.getClient() || '{}',
    'uid': this.getUid() || '{}',
  });

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    localStorage.setItem('access-token', token);
  }

  setUid(uid: string) {
    localStorage.setItem('uid', uid);
  }

  setClient(client: string) {
    localStorage.setItem('client', client);
  }

  getToken() {
    return localStorage.getItem('access-token');
  }

  getUid() {
    return localStorage.getItem('uid');
  }

  getClient() {
    return localStorage.getItem('client');
  }

  login(data: LogIn): Observable<any> {
    return this.http.post(
      this.url + '/api/auth/sign_in',
      data, { headers: this.httpHeaders, observe: 'response'});
  }

  signUp(data: SignUp): Observable<any>{
    return this.http.post(
      this.url + '/api/auth',
      data, { headers: this.httpHeaders, observe: 'response'});
  }

  logOut(): Observable<any> {
    return this.http.delete(this.url + '/api/auth/sign_out', {headers: this.authHeaders});
  }

  authToken(): Observable<any> {
    return this.http.get(this.url + '/api/auth/validate_token', {headers: this.authHeaders});
  }

}
export class LogIn {
  constructor(
    public email?: string,
    public password?: string
  ) {}
}
export class SignUp {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
    public password_confirm?: string
  ) {}
}