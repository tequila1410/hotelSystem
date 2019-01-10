import { Component, OnInit } from '@angular/core';
import {ListService} from './list.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  /**
   * if need to show current or all bookings
   * @type {boolean}
   */
  currentOrAllBookingsVisible:boolean = true;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getCurrentBookings().subscribe(data => {
      console.log(data);
    })
  }

}
