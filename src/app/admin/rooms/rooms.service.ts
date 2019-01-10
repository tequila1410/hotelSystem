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

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/room/get/category`);
  }

  changeRoom(id: number, number: number, category: number, countBed: number, status: string) {

    const data = {
      id: id, 
      number: number,
      category: category,
      countBed: countBed,
      status: +status
    }
    
    return this.http.post(`${environment.apiUrl}/room/edit`, data);
  }

  addNewRoom(number: number, category: number, countBed: number, status: string) {
    const data = {
      number: number,
      category: category,
      countBed: countBed,
      status: +status
    }
    
    return this.http.post(`${environment.apiUrl}/room/add`, data);
  }

  /**
   * This methods removes room by it's id
   * @param roomId
   */
  deleteRoom(roomId: any) {
    return this.http.delete(`${environment.apiUrl}/room/delete/${roomId}`);
  }
}
