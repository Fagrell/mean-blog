import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  form: FormGroup;
  direction: string = 'horizontal'
  editing: Boolean = true;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      blogMessage: ['']
    });
  }

  onEditClicked() {
    this.editing= true;
  }

  onPreviewClicked() {
    this.editing= false;
  }

  onSaveSubmit() {

  }

  ngOnInit() {
  }

}
