import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  newBlog(blog) {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.post(this.auth.domain + '/blog/new', blog, { headers: headers });
  }

  allBlogs() {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.get(this.auth.domain + '/blog/all', { headers: headers });
  }
}
