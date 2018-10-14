import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authService.userLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
}