import { Component, OnInit, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { RoomsService } from './rooms.service';
import { Room } from './models/room.model'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass']
})

export class RoomsComponent implements OnInit {
  
  rooms: Room[];
  filteredRooms: Room[] = [];
  roomToSearch: string;
  isVisibleAddBlock: boolean = false;
  isVisibleEditBlock: boolean = false;
  selectedRoom: Room;
  
  categories: any[];

  @ViewChild('newNumber') newNumber: ElementRef;
  @ViewChild('newCategory') newCategory: any;
  @ViewChild('newCountSeats') newCountSeats: any;
  @ViewChild('newStatus') newStatus: any;

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.roomsService.getCategories().subscribe(data => {
      this.categories = [...data];
    })

    this.roomsService.getRooms().subscribe(data => {
      console.log(data)
      this.rooms = [...data];
      this.filteredRooms = [...data];
    })
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
    this.selectedRoom = null;
  }

  editSelectedRoom() {
    if (!this.isEmptyObject(this.selectedRoom)) {
      this.isVisibleAddBlock = true;
      this.isVisibleEditBlock = false;
    }
  }

  saveChangedRoom() {
    let categoryName;
    this.categories.map(category => {
      if(category.name == this.newCategory.nativeElement.value) {
        categoryName = category.idCategories;
      }
    })

    this.roomsService.changeRoom(this.selectedRoom.idRoom, this.newNumber.nativeElement.value,
      categoryName, this.newCountSeats.nativeElement.value, 
      this.newStatus.nativeElement.value).subscribe(response => {
        this.selectedRoom.number = this.newNumber.nativeElement.value;
        this.selectedRoom.name = this.newCategory.nativeElement.value;
        this.selectedRoom.countSeats = this.newCountSeats.nativeElement.value;
        this.selectedRoom.isEmpty = this.newStatus.nativeElement.value;
    })
  }

  isEmptyObject(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
  }

}
