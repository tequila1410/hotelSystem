import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  /**
   * Current date
   * @type {string}
   */
  currentDate: string;
  
  constructor(private http: HttpClient) {
    const today = new Date();
    this.currentDate = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
  }
  
  getAllClients(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/client/get_all`);
  }
  
}
