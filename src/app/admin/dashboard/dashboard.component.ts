import {Component, OnInit} from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  public countEmptyRooms: number = 0;
  public countCurrentClients: number = 0;
  public countAllRequests: number = 0;
  
  constructor(private dashboardService: DashboardService) {
  }
  
  ngOnInit() {
    this.dashboardService.getDashboardInformation().subscribe((response: any) => {
      this.countEmptyRooms = response[0][0].countEmpty || 0;
      this.countCurrentClients = response[1][0].count || 0;
      this.countAllRequests = response[2][0].count || 0;
    });
  }
}
