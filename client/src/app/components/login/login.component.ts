import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../services/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup; 
  errorMessageClass;
  errorMessage;
  previousUrl;

  submitProcessing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private authGuard: AuthGuard,
    private router: Router
  ) { 
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    this.submitProcessing = true;
    const user = {
      username: this.form.controls.username.value,
      password: this.form.controls.password.value
    };

    this.authService.loginUser(user).subscribe(data => {
      if (!data['success']) {
        this.errorMessageClass = 'alert alert-danger';
        this.errorMessage = data['message'];
        this.submitProcessing = false;
        return;
      }
      this.authService.storeUserData(data['token'], data['user']);
      if (this.previousUrl) {
        return this.router.navigate([this.previousUrl]);
      }
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.errorMessageClass = 'alert alert-danger';
      this.errorMessage = 'You must login to view \'' + this.authGuard.redirectUrl +'\'';
      this.previousUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }

}
