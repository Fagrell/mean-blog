import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  domain = "http://localhost:8080";
  authenticateToken;
  user;

  constructor(
    private http: HttpClient
  ) { }

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


}
