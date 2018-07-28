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
  
  updateBlog(blog) {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.put(this.auth.domain + '/blog/update', blog, { headers: headers });
  }

  allBlogs() {
    return this.http.get(this.auth.domain + '/blog/all');
  }

  oneBlog(title: string) {
    return this.http.get(this.auth.domain + '/blog/one/' + title);
  }

  fewBlogs(amount: number) {
    return this.http.get(this.auth.domain + '/blog/few?amount=' + amount.toString());
  }

  deleteBlog(id: any) {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.delete(this.auth.domain + '/blog/delete/' + id, { headers: headers });
  }
}
