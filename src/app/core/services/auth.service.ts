import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiBase;
  userSignedIn$:Subject<boolean> = new ReplaySubject(1);

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  authHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'access-token': this.getToken()!,
    'client': this.getClient()!,
    'uid': this.getUid()!
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

  private getToken() {
    return localStorage.getItem('access-token');
  }

  private getUid() {
    return localStorage.getItem('uid');
  }

  private getClient() {
    return localStorage.getItem('client');
  }

  login(data: LogIn): Observable<any> {
    return this.http.post(
      this.url + '/api/auth/sign_in',
      data, { headers: this.httpHeaders, observe: 'response'})
  }

  signUp(data: SignUp): Observable<any>{
    return this.http.post(
      this.url + '/api/auth',
      data, { headers: this.httpHeaders, observe: 'response'});
  }

  logOut(): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': this.getToken()!,
      'client': this.getClient()!,
      'uid': this.getUid()!
    });
    return this.http.delete(this.url + '/api/auth/sign_out', {headers: header});
  }

  score(score:number) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': this.getToken()!,
      'client': this.getClient()!,
      'uid': this.getUid()!
    });
    return this.http.post(environment.apiBase + '/api/scores', {score: score}, {headers: header})
  }

  authToken(): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': this.getToken()!,
      'client': this.getClient()!,
      'uid': this.getUid()!
    });
    return this.http.get(this.url + '/api/auth/validate_token', {headers: header});
  }

  private profile(id:any): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'access-token': this.getToken()!,
      'client': this.getClient()!,
      'uid': this.getUid()!
    });
    return this.http.get(this.url + '/api/users/' + id, {headers: header})
  }
  
  getProfile(): Observable<any> {
    return this.authToken().pipe(
      map((resp:any) => {return resp.data.id}),
      switchMap(id => this.profile(id))
    )
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