import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  message: String = "";
  messageClass: String = "";
  newPost: Boolean = false;
  loadingFeed: Boolean  = false;

  public blogMessage: String = "";

  constructor(
    private router: Router
  ) {}

  newBlogForm() {
    this.newPost = true;

    this.router.navigate(['/blog-edit']);
  }

  refreshFeed() {
    this.loadingFeed = true;
    setTimeout(() => {
      this.loadingFeed = false;
    }, 4000)
  }

  ngOnInit() {
  }

}
