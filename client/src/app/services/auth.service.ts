import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = environment.domain;
  authToken = null;
  user = null;
  jwtHelper = new JwtHelperService();

  constructor(@Inject(LOCAL_STORAGE) 
    private localStorage: any, 
    private http: HttpClient
  ) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    this.authToken = token;

    const user = localStorage.getItem('user');
    if (!user) {
      this.authToken = null;
      return;
    }
    this.user = user;
    
    if (!this.checkToken()) {
      this.authToken = null;
      this.user = null;
    }
   }

  createAuthenticationHeaders() {
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': this.localStorage.getItem('token')
      });
  }

  registerUser(user) {
    const headers = this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/authentication/register', user, { headers: headers });
  }

  loginUser(user) {
    return this.http.post(this.domain + '/authentication/login', user);
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    this.localStorage.clear();
  }

  userLoggedIn() {
    if (!this.authToken) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  storeUserData(token, user) {
    this.localStorage.setItem('token', token);
    this.localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    const headers = this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', { headers: headers });
  }

  checkToken() {
    const headers = this.createAuthenticationHeaders();
    const httpRequest = this.http.get(this.domain + '/authentication/profile', { headers: headers });
    httpRequest.subscribe( profile => {
      if (!profile['success']) {
        return false;
      }
      
      return false;
    });
    return true;
  }


}
