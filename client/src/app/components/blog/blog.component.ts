import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  message: String = "";
  messageClass: String = "";
  loadingFeed: Boolean  = false;
  title: String = "";
  body: String = "";
  createdBy: String = "";
  createdAt: Date;

  public blogMessage: String = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
        if (!params['title']) {
          return; //handle it!
        }
        this.blog.oneBlog(params['title']).subscribe(data => {
          if(!data['success']) {
            return console.log("Failed getting blog, becase: " + data['message']);
          }
          this.title = data['blog'].title;
          this.body = data['blog'].body;
          this.createdBy = data['blog'].createdBy;
          this.createdAt = data['blog'].createdAt;

        });
      });
  }

}
