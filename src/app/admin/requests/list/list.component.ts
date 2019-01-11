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

  /**
   * info about client bookings

   */
  generalClientInfo = {};
  /**
   * info about room bookings

   */
  generalRoomInfo = {};
  selectedBooking: Booking;
  isDetailInfoVisible = false;
  countDays:number;

  constructor(private listService: ListService) {}

  ngOnInit() {

    this.listService.getCurrentBookings().subscribe((bookings: Booking[]) => {
      this.currentBookings = [...bookings];
    })

    this.listService.getAllBookings().subscribe((bookings: Booking[]) => {
      this.allBookings = [...bookings];
    })

  }

  getGeneralClientInfo (booking: Booking) {
    console.log(booking);
    this.isDetailInfoVisible = true;
    this.selectedBooking = booking;
    this.listService.getClientById(booking.idClient).subscribe(data => {
      this.generalClientInfo = data[0];
      console.log(this.generalClientInfo)
    })
    this.listService.getRoomById(booking.number).subscribe(data => {
      this.generalRoomInfo = data[0];
      console.log(this.generalRoomInfo)
    })
    this.countDays = ListService.getDaysCount(booking.dateCheck, booking.dateEviction)
  }

}
