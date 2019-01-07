import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  /**
   * Current date
   * @type {string}
   */
  currentDate: string;
  
  constructor(private http: HttpClient) {
    const today = new Date();
    this.currentDate = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
  }
  
  getRooms(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/room/get/all`);
  }
}
