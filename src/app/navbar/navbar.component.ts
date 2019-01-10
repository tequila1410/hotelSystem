import { Component, OnInit } from '@angular/core';
import {UserService} from '../auth/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  
  /**
   * Cleat cookies and log out user
   */
  logout(): void {
  this.userService.logout().subscribe(() => {
    localStorage.clear();
    this.userService.isVarified = false;
    this.router.navigate(['login'])
  })
  }

}
