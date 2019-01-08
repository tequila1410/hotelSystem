import {Component} from '@angular/core';
import {UserService} from './auth/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {
    this.userService.verifyAuthentication().subscribe((data: any) => {
      if (data.isVerified) {
        console.log('Verified');
      } else {
        alert('Вы не авторизированы. Редиректим Вас на страничку авторизации...');
        this.router.navigate(['login']);
      }
    });
  }
}
