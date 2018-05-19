import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  redirectUrl = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('AuthGuard created!');
  }

  canActivate(
    activatedRouter: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.userLoggedIn()) {
      return true;
    }
    this.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}