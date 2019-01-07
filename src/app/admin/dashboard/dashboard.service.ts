import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private http: HttpClient) {
  }
  
  /**
   * Getting dashboard information
   */
  getDashboardInformation() {
    const today = new Date();
    const emptyRoomsUrl = environment.apiUrl + '/room/get/emptyRoom';
    const currentClients = environment.apiUrl + '/booking/get/countCurrentClients/' + today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate();
    const allRequests = environment.apiUrl + '/booking/get/countAllRequests/';
    
    return forkJoin(this.http.get(emptyRoomsUrl), this.http.get(currentClients), this.http.get(allRequests));
  }
}
