import { Component } from '@angular/core';
import {UserService} from './auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  
  constructor(private userService: UserService) {
    // this.userService.verifyAuthentication();
  }
}
