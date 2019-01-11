import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  
  /**
   * Current date
   * @type {string}
   */
  currentDate: string;
  
  
  constructor(private http: HttpClient) {
    const today = new Date();
    this.currentDate = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
  }
  
  /**
   * Query to server to get current bookings
   */
  getCurrentBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/booking/get/bookings/curDate/${this.currentDate}`)
  }

  /**
   * Query to server to get current bookings
   */
  getAllBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/booking/get/all`)
  }

  /**
   * Query to server to get current client
   */
  getClientById(clientId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/client/findby/id/${clientId}`)
  }
  /**
   * Query to server to get current room
   */
  getRoomById(roomNumber: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/room/findby/number/${roomNumber}`)
  }

  /**
   * Get count days
   * @param start
   * @param end
   */
  static getDaysCount(start, end) {
    const oneDay = 24 * 60 * 60 * 1000;
    const startSplit = start.split('.');
    const endSplit = end.split('.');
    const dateStart = new Date(startSplit[2], startSplit[1], startSplit[0]);
    const dateEnd = new Date(endSplit[2], endSplit[1], endSplit[0]);
    return Math.round(Math.abs((dateEnd.getTime() - dateStart.getTime()) / (oneDay)));
  }
}
