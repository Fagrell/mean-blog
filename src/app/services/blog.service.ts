import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  private updatedSource = new Subject<object>();
  blogsUpdated = this.updatedSource.asObservable();

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  newBlog(blog) {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.post(this.auth.domain + '/posts/new', blog, { headers: headers });
  }
  
  updateBlog(blog) {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.put(this.auth.domain + '/posts/update', blog, { headers: headers });
  }

  allBlogs() {
    return this.http.get(this.auth.domain + '/posts/all');
  }

  oneBlog(title: string) {
    return this.http.get(this.auth.domain + '/posts/one/' + title);
  }

  fewBlogs(amount: number) {
    return this.http.get(this.auth.domain + '/posts/few?amount=' + amount.toString());
  }

  deleteBlog(id: any) {
    const headers = this.auth.createAuthenticationHeaders();
    return this.http.delete(this.auth.domain + '/posts/delete/' + id, { headers: headers });
  }

  blogsHaveUpdated() {
    this.updatedSource.next();
  }
}
