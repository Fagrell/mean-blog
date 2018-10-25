import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Title, Meta } from '@angular/platform-browser';

const STATE_KEY_BLOGS = makeStateKey('blogs');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs : any = [];

  constructor(@Inject(WINDOW) 
    private window: Window,
    private router: Router,
    private blog: BlogService,
    public auth: AuthService,
    private state: TransferState,
    private pageTitle: Title,
    private meta: Meta
  ) {}

  newBlogForm() {
    this.router.navigate(['/blog-edit']);
  }
  deleteBlog(id: any, title: string) {
    if (!this.window.confirm('Are sure you want to delete ' + title + '?')) {
      return;
    }

    this.blog.deleteBlog(id).subscribe(data => {
      if(!data['success']) {
        return console.log("Failed to delete the blog because: " + data['message']);
      }
      console.log('Blog deleted');
      this.getAllBlogs();
      this.blog.blogsHaveUpdated();
    });
  }

  getAllBlogs() {
    this.blog.allBlogs().subscribe(data => {
      if(!data['success']) {
        return console.log("Failed fetching all blogs, because: " + data['message']);
      }
      this.blogs = data['blogs'];
      this.state.set(STATE_KEY_BLOGS, <any>this.blogs);
    });
  }

  ngOnInit() {
    this.pageTitle.setTitle('Qt and C++ Blog / Clean Qt');
    const description = "Exploring how to write clean Qt and C++ code"
    this.meta.updateTag({
      property: 'description',
      content: description
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Qt and C++ Blog'
    });
    this.meta.updateTag({
      property: 'og:description',
      content: description
    });
    this.blogs = this.state.get(STATE_KEY_BLOGS, <any>[]);
    if (this.blogs.length == 0) {
      this.getAllBlogs();
    }
  }
}
