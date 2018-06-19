import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  form: FormGroup;
  direction: string = 'horizontal'
  editing: Boolean = true;
  username: string = '';


  splitTags(controls) {
    return controls.value.replace(/\s/g, '').split(',');
  }

  constructor(
    private formBuilder: FormBuilder,
    private blog: BlogService,
    private auth: AuthService
  ) { 
    this.createForm();

    this.auth.getProfile().subscribe(profile => {
      if (!profile['success']) {
        return;
      }
      this.username = profile['user']['username'];
    });
    
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [''],
      summaryMessage: [''],
      blogMessage: [''],
      publicCheckBox: [false],
      tagsList: ['', this.validateTags.bind(this)]
    });
  }

  validateTags(controls) {
    if (!controls) {
      return null;
    }
    //TODO This list should come from a mongoDB model
    const allowedList = ['cpp', 'c', 'mo'];
    const tagsList = this.splitTags(controls);
    for (var i = 0; i < tagsList.length; i++) {
      const found = allowedList.find(element => {
        return element === tagsList[i];
      });
      if (found === undefined) {
        return { 'validateTags': true }
      }
    }
    return null;
  }

  onEditClicked() {
    this.editing= true;
  }

  onPreviewClicked() {
    this.editing= false;
  }

  onSaveSubmit() {
    const blogData = {
       title: this.form.controls.title.value,
       summary: this.form.controls.summaryMessage.value,
       body: this.form.controls.blogMessage.value,
       createdBy: this.username,
       tags: this.splitTags(this.form.controls.tagsList),
       public: this.form.controls.publicCheckBox.value
    };

    this.blog.newBlog(blogData).subscribe(data => {
      if (!data['success']) {
        console.log("Failed creating new blog, because: " + data['message']);
        return;
      }
      console.log("Successfully creating new blog");
    });

  }

  ngOnInit() {
  }

}
