import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  onLogoutClick() {
    this.authenticateService.logoutUser();
    this.flashMessagesService.show('You have logged out!', { cssClass: 'alert-info text-center'});
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
