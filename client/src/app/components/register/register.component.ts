import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup; 

  constructor(
     private formBuilder: FormBuilder
  ) { 
     this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        this.validateUsername
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.validatePassword 
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.matchingPasswords() });
  }

  validateUsername(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null; 
    }
    // Invalid
    return { 'validateUsername': true }
  }

  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    }
    //invalid
    return { 'validateEmail': true } 
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,30}$/);
    if (regExp.test(controls.value)) {
      return null; 
    }
    //Invalid
    return { 'validatePassword': true }
  }

  matchingPasswords() {
    return (group: FormGroup) => {
      if (group.controls.password.value === group.controls.confirm.value) {
        return null;
      }
      //Invalid
      return { 'matchingPasswords': true }
    }
  }

  onRegisterSubmit() {
    console.log(this.form);
  }

  ngOnInit() {
  }

}
