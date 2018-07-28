import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  newBlog: Boolean = true;
  id;
  submitProcessing: Boolean = false;
  errorMessageClass: string;
  errorMessage: string;


  splitTags(controlType: string) {
    return controlType.replace(/\s/g, '').split(',');
  }

  constructor(
    private formBuilder: FormBuilder,
    private blog: BlogService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: [''],
      summaryMessage: [''],
      blogMessage: [''],
      publicCheckBox: [false],
      tagsList: ['']
    });
  }

  onEditClicked() {
    this.editing = true;
  }

  onPreviewClicked() {
    this.editing = false;
  }

  onSaveSubmit() {
    if (this.newBlog) {
      this.saveBlog();
      return;
    }
    this.updateBlog();
  }

  showErrorMessage(message) {
    this.errorMessageClass = 'alert alert-danger';
    this.errorMessage = message;
  }

  showSuccessMessage(message) {
    this.errorMessageClass = 'alert alert-success';
    this.errorMessage = message;
  }

  saveBlog() {
    this.submitProcessing = true;
    const blogData = {
      title: this.form.controls.title.value,
      summary: this.form.controls.summaryMessage.value,
      body: this.form.controls.blogMessage.value,
      createdBy: this.username,
      tags: this.splitTags(this.form.controls.tagsList.value),
      public: this.form.controls.publicCheckBox.value
   };

   this.blog.newBlog(blogData).subscribe(data => {
     if (!data['success']) {
       this.submitProcessing = false;
       window.scroll(0,0);
       this.showErrorMessage("Failed creating new blog, because: " + data['message']);
       return;
     }
     this.showSuccessMessage("Successfully creating new blog");
     window.scroll(0,0);
     this.newBlog = false;
     setTimeout(() => {
        this.router.navigate(['/blog-edit/'+blogData.title.toLowerCase().split(' ').join('-')])
      }, 1000);
   });
  }
  
  updateBlog() {
    this.submitProcessing = true;
    const blogData = {
      _id: this.id,
      title: this.form.controls.title.value,
      summary: this.form.controls.summaryMessage.value,
      body: this.form.controls.blogMessage.value,
      editedBy: this.username,
      tags: this.splitTags(this.form.controls.tagsList.value),
      public: this.form.controls.publicCheckBox.value
   };

   this.blog.updateBlog(blogData).subscribe(data => {
    this.submitProcessing = false;
     if (!data['success']) {
       window.scroll(0,0);
       this.showErrorMessage("Failed updating new blog, because: " + data['message']);
       return;
     }
     this.showSuccessMessage("Successfully updated new blog");
   });
  }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      if (!params['title']) {
        return; //handle it!
      }
      this.blog.oneBlog(params['title']).subscribe(data => {
        if(!data['success']) {
          return;
        }
        this.id = data['blog']._id;
        this.form.controls.title.setValue(data['blog'].title);
        this.form.controls.summaryMessage.setValue(data['blog'].summary);
        this.form.controls.blogMessage.setValue(data['blog'].body);
        this.form.controls.tagsList.setValue(data['blog'].tags.join(','));
        this.form.controls.publicCheckBox.setValue(data['blog'].public);
        this.newBlog = false;

      });
    });

    this.auth.getProfile().subscribe(profile => {
      if (!profile['success']) {
        return;
      }
      this.username = profile['user']['username'];
    });
  }

}
