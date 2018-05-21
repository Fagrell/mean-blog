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
      title: [''],
      summaryMessage: [''],
      blogMessage: [''],
      publicCheckBox: [false],
      tagsList: ['', this.validateTags]
    });
  }

  validateTags(controls) {
    const allowedList = ['cpp', 'c', 'mo'];
    const tagsList = controls.value.replace(/\s/g, '').split(',');
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

  }

  ngOnInit() {
  }

}
