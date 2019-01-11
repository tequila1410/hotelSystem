import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';
import {Booking} from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  /**
   * Call when seats data update
   * @type {Subject}
   */
  seatsSubject: Subject<any> = new Subject<any>();
  
  /**
   * Call when rooms data update
   * @type {Subject}
   */
  roomsSubject: Subject<any> = new Subject<any>();
  
  /**
   * Call when clients data update
   * @type {Subject}
   */
  clientsSubject: Subject<any> = new Subject<any>();
  
  /**
   * @ignore
   */
  constructor(private http: HttpClient) {
  }
  
  /**
   * Query to server to get all room category
   */
  getRoomCategory() {
    return this.http.get(`${environment.apiUrl}/room/get/category`);
  }
  
  /**
   * Query to server to get seats
   * @param categoryId
   */
  getSeats(categoryId) {
    this.http.get(`${environment.apiUrl}/room/get/category/seats/${categoryId}`).subscribe(data => {
      this.seatsSubject.next(data);
    });
  }
  
  /**
   * Query to server to find room
   * @param {number} idCategory
   * @param {number} countSeats
   */
  findRoom(idCategory: number, countSeats: number) {
    const params = {
      idCategory: idCategory, countSeats: countSeats
    };
    
    this.http.post(`${environment.apiUrl}/room/findby/category&seats`, params).subscribe(data => {
      this.roomsSubject.next(data);
    });
  }
  
  /**
   * Query to server to find client by name
   * @param {string} name
   */
  clientFindByName(name: string) {
    this.http.get(`${environment.apiUrl}/client/findby/name/${name}`).subscribe(data => {
      this.clientsSubject.next(data);
    });
  }
  
  /**
   * Get count days
   * @param start
   * @param end
   */
  getDaysCount(start, end) {
    if (start && end) {
      const oneDay = 24 * 60 * 60 * 1000;
      const startSplit = start.split('/');
      const endSplit = end.split('/');
      const dateStart = new Date(startSplit[2], startSplit[1], startSplit[0]);
      const dateEnd = new Date(endSplit[2], endSplit[1], endSplit[0]);
      return Math.round(Math.abs((dateEnd.getTime() - dateStart.getTime()) / (oneDay)));
    } else {
      return false;
    }
  }
  
  addBooking(room, client, checkInDate, evictionDate, price, countSeats) {
    
    const params = {
      idRoom: room.idRoom,
      idClient: client.idClient,
      checkInDate: checkInDate,
      evictionDate: evictionDate,
      price: price,
      countSeats: countSeats
    };
    
   return this.http.post(`${environment.apiUrl}/booking/add`, params);
  }
  
}
