import { Component, OnInit } from '@angular/core';
import {ListService} from './list.service';
import {Booking} from '../models/list.model'



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

  /**
   * array of current bookings
   * @type {Booking}
   */
  currentBookings:Booking[] = [];

  /**
   * array of current bookings
   * @type {Booking}
   */
  allBookings:Booking[] = [];

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService.getCurrentBookings().subscribe((bookings: Booking[]) => {
      this.currentBookings = [...bookings];
    })
    this.listService.getAllBookings().subscribe((bookings: Booking[]) => {
      this.allBookings = [...bookings];
    })
  }

}
