import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  domain = "http://localhost:8080";
  authenticateToken;
  user;

  options;

  constructor(
    private http: HttpClient
  ) { }

  createAuthenticationHeaders() {
    this.loadToken();
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'auth': this.authenticateToken
      });
  }

  loadToken() {
    this.authenticateToken = localStorage.getItem('token');
  }

  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user);
  }

  loginUser(user) {
    return this.http.post(this.domain + '/authentication/login', user);
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authenticateToken = token;
    this.user = user;
  }

  getProfile() {
    const headers = this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', { headers: headers });
  }


}
