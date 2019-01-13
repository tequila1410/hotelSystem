import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  
  /**
   * If user is verified
   * @type {boolean}
   */
  isVerified: boolean;
  
  /**
   * @ignore
   */
  constructor(private httpClient: HttpClient) {
  }
  
  /**
   * Query to server to log in user
   * @param {string} username
   * @param {string} password
   */
  loginUser(username: string, password: string): Observable<any> {
    const postData = {
      'username': username, 'password': password
    };
    
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, postData, { withCredentials: true });
  }
  
  /**
   * Query to server to verify user if user is login
   */
  verifyAuthentication(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/auth/verifyAuthentication`, { withCredentials: true });
  }
  
  /**
   * Query to server to logout user and clean cookies
   */
  logout(): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/auth/logout`, null, { withCredentials: true });
  }
  
}
