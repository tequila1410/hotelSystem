import { Component } from '@angular/core';
import {UserService} from './auth/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  
  constructor(private userService: UserService, private router: Router) {
    this.userService.verifyAuthentication()
      .subscribe((data: any) => {
        if (data.isVerified) {
          console.log('if ver.')
          this.router.navigate(['dashboard'])
        }
    });
  }
}
