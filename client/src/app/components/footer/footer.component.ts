import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  blogs;

  constructor(
    private blog: BlogService
  ) { }

  ngOnInit() {
    this.blog.fewBlogs(3).subscribe(data => {
      if (!data['success']) {
        return console.log("Failed getting all blogs, becase: " + data['message']);
      }
      
      if (!data['blogs']) {
        return console.log("Failed to get all blogs");
      }

      this.blogs = data['blogs'];
    });
  }

}
