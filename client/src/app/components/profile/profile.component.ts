import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = null;
  email = null;

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if (!profile['success']) {
        return;
      }
      this.username = profile['user']['username'];
      this.email = profile['user']['email'];
    });
  }

}
