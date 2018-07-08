import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs;

  constructor(
    private router: Router,
    private blog: BlogService,
    private auth: AuthService
  ) {}

  newBlogForm() {
    this.router.navigate(['/blog-edit']);
  }

  ngOnInit() {
    this.blog.allBlogs().subscribe(data => {
      if(!data['success']) {
        return console.log("Failed getting all blogs, becase: " + data['message']);
      }
      this.blogs = data['blogs'];
    });
  }
}
