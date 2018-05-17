import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup; 

  errorMessageClass;
  errorMessage;
  
  submitProcessing = false;

  constructor(
     private formBuilder: FormBuilder,
     private authenticateService: AuthenticateService,
     private router: Router
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
    this.submitProcessing = true;
    const user = {
      username: this.form.controls.username.value,
      email: this.form.controls.email.value,
      password: this.form.controls.password.value
    };

    this.authenticateService.registerUser(user).subscribe(data => {
      if (!data['success']) {
        this.errorMessageClass = 'alert alert-danger';
        this.errorMessage = data['message'];
        this.submitProcessing = false;
        return;
      }

      this.router.navigate(['/login']);
    });

  }

  ngOnInit() {
  }

}
