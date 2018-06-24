import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: String = "";
  messageClass: String = "";
  loadingFeed: Boolean  = false;
  blogs;

  public blogMessage: String = "";

  constructor(
    private router: Router,
    private blog: BlogService
  ) {}

  newBlogForm() {
    this.router.navigate(['/blog-edit']);
  }

  refreshFeed() {
    this.loadingFeed = true;
    setTimeout(() => {
      this.loadingFeed = false;
    }, 4000)
  }

  ngOnInit() {
    this.blog.allBlogs().subscribe(data => {
      console.log("GOES HERE?");
      if(!data['success']) {
        return console.log("Failed getting all blogs, becase: " + data['message']);
      }
      console.log("goes here?")
      this.blogs = data['blogs'];
    });
  }
}
