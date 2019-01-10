import {Component} from '@angular/core';
import {UserService} from './auth/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  constructor(public userService: UserService, private router: Router) {
    this.userService.verifyAuthentication().subscribe((data: any) => {
      if (data.isVerified) {
        this.userService.isVerified = true;
        localStorage.setItem('isVerified', 'true');
      }
    }, (err) => {
      localStorage.removeItem('isVerified');
      if(this.userService.isVerified) {
        alert('Вы не авторизированы. Редиректим Вас на страничку авторизации...');
        this.router.navigate(['login']);
      }
    });
  }
}
