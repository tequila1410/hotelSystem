import { Component, OnInit, ɵConsole, ViewChild, ElementRef } from '@angular/core';
import { RoomsService } from './rooms.service';
import { Room } from './models/room.model'
import { Category } from './models/category.model'

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.sass']
})

export class RoomsComponent implements OnInit {
  
  rooms: Room[];
  filteredRooms: Room[] = [];
  categories: Category[];
  
  roomToSearch: string;
  isVisibleAddBlock: boolean = false;
  isVisibleEditBlock: boolean = false;
  selectedRoom: Room;
  newRoomMode: boolean = false;

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
      this.isVisibleAddBlock = false;
      this.isVisibleEditBlock = true;
      this.newRoomMode = false;
    }
  }

  addNewRoom() {
    this.newRoomMode = true;
    this.selectedRoom = null;
    this.isVisibleAddBlock = true;
    this.isVisibleEditBlock = false;
  }

  createNewRoom() {
    let categoryName = this.categoryName();
    this.roomsService.addNewRoom(+this.newNumber.nativeElement.value, categoryName, +this.newCountSeats.nativeElement.value, this.newStatus.nativeElement.value).subscribe(response => {
      this.roomsService.getRooms().subscribe(data => {
        this.isVisibleAddBlock = false;
        this.isVisibleEditBlock = false;
        
        this.rooms = [...data];
        this.filteredRooms = [...data];
      })
    })
  }

  editSelectedRoom() {
    if (!this.isEmptyObject(this.selectedRoom)) {
      this.isVisibleAddBlock = true;
      this.isVisibleEditBlock = false;
    }
  }

  /**
   * Handler for delete button click
   * It removes an element from the list and 
   */
  deleteSelectedRoom() {
    if (!this.isEmptyObject(this.selectedRoom)) {
      this.roomsService.deleteRoom(this.selectedRoom.idRoom).subscribe(data => {
        this.isVisibleAddBlock = false;
        this.isVisibleEditBlock = false;

        const elementIndex = this.rooms.findIndex(element => element.idRoom === this.selectedRoom.idRoom);
        this.rooms.splice(elementIndex, 1);
        this.filteredRooms = [...this.rooms];
      });
    }
  }

  /**
   * Handler for save button click
   * It saves room's changes
   */
  saveChangedRoom() {
    let categoryName = this.categoryName();
    this.roomsService.changeRoom(this.selectedRoom.idRoom, this.newNumber.nativeElement.value,
      categoryName, this.newCountSeats.nativeElement.value, 
      this.newStatus.nativeElement.value).subscribe(response => {
        this.isVisibleAddBlock = false;
        this.isVisibleEditBlock = false;

        this.roomsService.getRooms().subscribe(data => {
          this.rooms = [...data];
          this.filteredRooms = [...data];
        })
    })
  }

  categoryName() {
    let categoryName;

    this.categories.forEach(category => {
      if(category.name == this.newCategory.nativeElement.value) {
        categoryName = category.idCategories;
      }
    })

    return categoryName
  }

  isEmptyObject(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
  }

}
