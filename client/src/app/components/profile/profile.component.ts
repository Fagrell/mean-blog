import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(
    private authenticateService : AuthenticateService
  ) { }

  ngOnInit() {
    this.authenticateService.getProfile().subscribe(profile => {
      this.user = profile['user'];
    });
  }

}
