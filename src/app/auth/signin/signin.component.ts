import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin', templateUrl: './signin.component.html', styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  
  profileForm = new FormGroup({
    login: new FormControl(''), password: new FormControl('')
  });
  
  constructor(private userService: UserService, private router: Router) {}
  
  ngOnInit() {
  }
  
  /**
   * Try to login
   */
  login(): void {
    this.userService.loginUser(this.profileForm.value.login, this.profileForm.value.password).subscribe((data: { success: boolean }) => {
      if (data.success) {
        localStorage.setItem('isVerified', 'true');
        this.router.navigate(['dashboard']);
      } else {
        alert('Check your login or password!');
        this.userService.isVerified = false;
      }
    });
  }
  
}
