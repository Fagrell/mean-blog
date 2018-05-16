import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
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

    this.authenticateService.loginUser(user).subscribe(data => {
      if (!data['sucess']) {
        this.errorMessageClass = 'alert alert-danger';
        this.errorMessage = data['message'];
        this.submitProcessing = false;
        return;
      }
      this.authenticateService.storeUserData(data['token'], data['user']);
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
  }

}
