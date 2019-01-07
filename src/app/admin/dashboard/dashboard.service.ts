import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
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
   * Getting dashboard information
   */
  getDashboardInformation(): Observable<any> {
    const emptyRoomsUrl = environment.apiUrl + '/room/get/emptyRoom';
    const currentClients = environment.apiUrl + '/booking/get/countCurrentClients/' + this.currentDate;
    const allRequests = environment.apiUrl + '/booking/get/countAllRequests/';
    
    return forkJoin(this.http.get(emptyRoomsUrl), this.http.get(currentClients), this.http.get(allRequests));
  }
  
  /**
   * Get all available bookings
   */
  getBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/booking/get/endsBookings/${this.currentDate}`);
  }
  
  /**
   * Get user by id
   * @param id
   */
  getUserById(id) {
    return this.http.get(`${environment.apiUrl}/client/findby/id/${id}`);
  }
  
  /**
   * Get room by number
   * @param number
   */
  getRoomById(number) {
    return this.http.get(`${environment.apiUrl}/room/findby/number/${number}`);
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
