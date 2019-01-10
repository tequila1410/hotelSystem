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
   * Query to server to get all clients
   */
  getCurrentBookings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/booking/get/bookings/curDate/${this.currentDate}`)
  }
  
  /**
   * Query to server to save changed client info
   * @param {Client} client
   */
//   saveChangedClient(client: Client): Observable<any> {
//     let postData = {
//       id: client.idClient,
//       name: client.name,
//       passport: client.passport,
//       phone: client.phone,
//       bdate: client.birthDate,
//       address: client.address
//     };
    
//     return this.http.post(`${environment.apiUrl}/client/edit`, postData);
//   }

  /**
   * Query to server to save new client 
   * @param {Client} client
   */
//   addNewClient(client: Client): Observable<any> {

//     let postData = {
//       name: client.name,
//       passport: client.passport,
//       phone: client.phone,
//       bdate: client.birthDate,
//       address: client.address
//     };
    
//     return this.http.post(`${environment.apiUrl}/client/add`, postData);
//   }

  /**
   * This methods removes room by it's id
   * @param clientId
   */
//   deleteClient(clientId: any) {
//     return this.http.delete(`${environment.apiUrl}/client/delete/${clientId}`);
//   } 
}
