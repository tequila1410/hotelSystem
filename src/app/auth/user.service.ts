import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  loginUser(username: string, password: string) {
    // const postData = new FormData();
    // postData.set('username', username);
    // postData.set('password', password);
    const postData = {
      "username": username,
      "password": password
    }
    // const params = new HttpParams()
    //   .set('username', username)
    //   .set('password', password);
    return this.httpClient.post('http://localhost:8080/auth/login', postData);
  }
  verifyAuthentication() {
  this.httpClient.get('http://localhost:8080/auth/verifyAuthentication').subscribe(data => {
    console.log(data);
  });
  }
}
