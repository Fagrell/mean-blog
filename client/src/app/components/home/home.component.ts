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
  errorMessageClass: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private blog: BlogService,
    private auth: AuthService
  ) {}

  newBlogForm() {
    this.router.navigate(['/blog-edit']);
  }
  deleteBlog(id: any, title: string) {
    if (!window.confirm('Are sure you want to delete ' + title + '?')) {
      return;
    }

    this.blog.deleteBlog(id).subscribe(data => {
      if(!data['success']) {
        return console.log("Failed delete blog because: " + data['message']);
      }
      console.log('Blog deleted');
      this.getAllBlogs();
    });
  }

  getAllBlogs() {
    this.blog.allBlogs().subscribe(data => {
      if(!data['success']) {
        return console.log("Failed getting all blogs, because: " + data['message']);
      }
      this.blogs = data['blogs'];
    });
  }

  ngOnInit() {
    this.getAllBlogs();
  }
}
