import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const STATE_KEY_BLOGS = makeStateKey('blogs');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  blogs : any = [];

  constructor(
    private blog: BlogService,
    private state: TransferState
  ) { }

   refreshBlogs() {
    this.blog.fewBlogs(3).subscribe(data => {
      if (!data['success']) {
        return console.log("Failed getting all blogs, because: " + data['message']);
      }
      
      if (!data['blogs']) {
        return console.log("Failed to get all blogs");
      }

      this.blogs = data['blogs'];
      this.state.set(STATE_KEY_BLOGS, <any>this.blogs);
    });
  }

  ngOnInit() {
    this.blogs = this.state.get(STATE_KEY_BLOGS, <any>[]);
    if (this.blogs.length == 0) {

      this.refreshBlogs();
      this.blog.blogsUpdated.subscribe(() => {
        this.refreshBlogs();
      });
    }
  }

}
