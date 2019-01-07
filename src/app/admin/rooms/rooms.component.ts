import { Component, OnInit, ɵConsole } from '@angular/core';
import { RoomsService } from './rooms.service';

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

  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
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
    this.isVisibleEditBlock = true;
    this.selectedRoom = room;
    if (this.isVisibleAddBlock) {

    }
  }

}
