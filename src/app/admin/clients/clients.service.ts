import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Client} from './models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  
  /**
   * Current date
   * @type {string}
   */
  currentDate: string;
  
  /**
   * Call when all clients data update
   * @type {Subject<Client[]>}
   */
  allClientsSubject: Subject<Client[]> = new Subject<any>();
  
  constructor(private http: HttpClient) {
    const today = new Date();
    this.currentDate = today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
  }
  
  /**
   * Query to server to get all clients
   */
  getAllClients(): void {
    this.http.get(`${environment.apiUrl}/client/get_all`).subscribe((response: Client[]) => {
      this.allClientsSubject.next(response);
    })
  }
  
  /**
   * Query to server to save changed client info
   * @param {Client} client
   */
  saveChangedClient(client: Client): Observable<any> {
    let postData = {
      id: client.idClient,
      name: client.name,
      passport: client.passport,
      phone: client.phone,
      bdate: client.birthDate,
      address: client.address
    };
    
    return this.http.post(`${environment.apiUrl}/client/edit`, postData);
  }

  /**
   * Query to server to save new client 
   * @param {Client} client
   */
  addNewClient(client: Client): Observable<any> {

    let postData = {
      name: client.name,
      passport: client.passport,
      phone: client.phone,
      bdate: client.birthDate,
      address: client.address
    };
    
    return this.http.post(`${environment.apiUrl}/client/add`, postData);
  }

  /**
   * This methods removes room by it's id
   * @param clientId
   */
  deleteClient(clientId: any) {
    return this.http.delete(`${environment.apiUrl}/client/delete/${clientId}`);
  } 
}
