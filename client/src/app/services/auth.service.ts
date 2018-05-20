import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://localhost:8080";
  authToken = null;
  user = null;
  jwtHelper = new JwtHelperService();

  constructor(
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
        'auth': localStorage.getItem('token')
      });
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user);
  }

  loginUser(user) {
    return this.http.post(this.domain + '/authentication/login', user);
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  userLoggedIn() {
    if (!this.authToken) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
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
