import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  
  constructor(private httpClient: HttpClient) {
  }
  
  loginUser(username: string, password: string) {
    const postData = {
      'username': username, 'password': password
    };
    
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, postData, { withCredentials: true });
  }
  
  verifyAuthentication() {
    return this.httpClient.get(`${environment.apiUrl}/auth/verifyAuthentication`, { withCredentials: true });
  }
}
