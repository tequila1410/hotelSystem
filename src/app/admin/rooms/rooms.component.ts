import { Component, OnInit, ɵConsole } from '@angular/core';
import { RoomsService } from './rooms.service';

// TODO: remove this
const mockedRooms=[
  {number: 201, name: 'Lux', countSeats: '5', price: '200$', isEmpty: 1},
  {number: 202, name: 'Econom', countSeats: '2', price: '100$', isEmpty: 0},
  {number: 203, name: 'Super-lux', countSeats: '3', price: '220$', isEmpty: 1},
  {number: 301, name: 'nameRoom301', countSeats: '4', price: '240$', isEmpty: 0},
  {number: 302, name: 'nameRoom302', countSeats: '1', price: '205$', isEmpty: 1},
  {number: 303, name: 'nameRoom303', countSeats: '2', price: '202$', isEmpty: 1},
  {number: 401, name: 'nameRoom401', countSeats: '4', price: '220$', isEmpty: 0},
  {number: 402, name: 'nameRoom402', countSeats: '2', price: '220$', isEmpty: 0},
  {number: 403, name: 'nameRoom403', countSeats: '1', price: '210$', isEmpty: 1}
]

const categories=[
  {name: 'Lux'},
  {name: 'Econom'},
  {name: 'Super-lux'},
  {name: 'Hostel-room'},
]

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass']
})

export class RoomsComponent implements OnInit {

  rooms: any[];
  filteredRooms: any[] = [];
  roomToSearch: string;
  isVisibleAddBlock: boolean = false;
  isVisibleEditBlock: boolean = false;
  selectedRoom: any[];
  
  //TODO: remove this

  categories: any[];


  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.rooms = mockedRooms;
    this.filteredRooms = mockedRooms;
    this.categories = categories;
    // this.roomsService.getRooms().subscribe(data => {
    //   this.rooms = [...data];
    //   this.filteredRooms = [...data];
    // })
  }

  onSearchChange(searchStr) {
    this.filteredRooms = this.rooms.filter(room => {
      if (room.number.toString().startsWith(searchStr)) {
        return room;
      }
    });
  }

  selectRoom(room) {
    this.selectedRoom = room;
    this.isVisibleEditBlock = true;
    if (this.isVisibleAddBlock) {
      this.isVisibleEditBlock = false;
    }
  }

  addNewRoom() {
    this.isVisibleAddBlock = true;
    this.isVisibleEditBlock = false;
    this.selectedRoom = [];
  }

  editSelectedRoom() {
    if (!this.isEmptyObject(this.selectedRoom)) {
      this.isVisibleAddBlock = true;
      this.isVisibleEditBlock = false;
    }
  }

  isEmptyObject(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
  }

}
