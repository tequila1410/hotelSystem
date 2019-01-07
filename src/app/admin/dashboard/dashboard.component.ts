import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public countEmptyRooms: number = 0;
  public countCurrentClients: number = 0;
  public countAllRequests: number = 0;
  public bookings: any[] = [];
  public showAdditionalInfo: boolean = false;
  public selectedBooking: any = {};
  
  constructor(private dashboardService: DashboardService) {
  }
  
  /**
   * Toggle for additional information section
   * @param booking
   */
  showInfo(booking) {
    this.showAdditionalInfo = true;
    this.selectedBooking = booking;
    
    this.selectedBooking.countDays = DashboardService.getDaysCount(this.selectedBooking.dateCheck, this.selectedBooking.dateEviction);
    
    this.dashboardService.getRoomById(this.selectedBooking.number).subscribe((room: any) => {
      this.selectedBooking = {
        ...this.selectedBooking, room: room[0]
      };
    });
    
    this.dashboardService.getUserById(this.selectedBooking.idClient).subscribe((user: any) => {
      this.selectedBooking = {
        ...this.selectedBooking, user: user[0]
      };
    });
  }
  
  ngOnInit() {
    this.dashboardService.getDashboardInformation().subscribe((response: any) => {
      this.countEmptyRooms = response[0][0].countEmpty || 0;
      this.countCurrentClients = response[1][0].count || 0;
      this.countAllRequests = response[2][0].count || 0;
    });
    
    this.dashboardService.getBookings().subscribe((response: any[]) => {
      this.bookings = response;
    });
  }
}
