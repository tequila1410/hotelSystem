import {Component, OnInit, ViewChild} from '@angular/core';
import {BookingService} from '../booking.service';
import {Category} from '../../rooms/models/category.model';
import {Subscription} from 'rxjs';
import {Client} from '../../clients/models/client.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  
  currentDate: string = (new Date()).toLocaleDateString();
  
  minEvictionDate: string;
  currentDateString: string;
  
  tom: Date = new Date();
  
  /**
   * Array of rooms category
   * @type {Category}
   */
  category: Category[] = [];
  
  /**
   * Array of free roms to select for new booking
   * @type {any[]}
   */
  roomsToSelect: any[] = [];
  
  /**
   * Array of seats for room
   */
  seats: any[];
  
  /**
   * Found clients
   * @type {Client[]}
   */
  clients: Client[];
  
  /**
   * Selected room for new booking
   */
  selectedRoom: any;
  
  /**
   * Selected client for new booking
   * @type {Client}
   */
  selectedClient: Client;
  
  /**
   * New booking price
   * @type {number}
   */
  bookingPrice: number = 0;
  
  /**
   * Contains subscriptions which react on clients data update
   * @type {Subscription}
   */
  clientsSubscription: Subscription;
  
  @ViewChild('catSelect') catSelect;
  @ViewChild('seatsSelect') seatsSelect;
  @ViewChild('clientSelect') clientSelect;
  @ViewChild('clientInput') clientInput;
  @ViewChild('evictionDate') evictionDate;

  constructor(private bookingService: BookingService, private router: Router) {
    this.tom.setDate(this.tom.getDate() + 1);
    this.minEvictionDate = this.tom.getFullYear() + '-' + this.tom.getMonth()+1 + '-' + this.tom.getDate();
    this.currentDateString = (new Date()).getFullYear() + '-' + (new Date()).getMonth()+1 + '-' + (new Date()).getDate();
    
    this.bookingService.getRoomCategory().subscribe((response: Category[]) => {
      this.category = [];
      this.category = [...response];
    });
    
    this.bookingService.seatsSubject.subscribe(data => {
      this.seats = data;
    });
    
    this.bookingService.roomsSubject.subscribe(rooms => {
      this.roomsToSelect = rooms;
    });
  
    this.clientsSubscription = this.bookingService.clientsSubject.subscribe(response => {
      this.clients = [...response]
    });
    
    this.bookingService.getSeats(1);
  }

  ngOnInit() {
  }
  
  /**
   * On category select box change
   * @param data
   */
  onCategoryChange(data): void {
    this.bookingService.getSeats(data.target.value)
  }
  
  /**
   * Search free room
   */
  searchRoom(): void {
    this.bookingService.findRoom(this.catSelect.nativeElement.value, this.seatsSelect.nativeElement.value)
  }
  
  /**
   * Search client by name or phone
   */
  searchClient(): void {
    if(this.clientSelect.nativeElement.value == 1) {
      this.bookingService.clientFindByName(this.clientInput.nativeElement.value)
    } else {
    
    }
  }
  
  /**
   * Select client for new booking
   * @param {Client} client
   */
  selectClient(client): void {
    this.selectedClient = client;
  }
  
  /**
   * Select room for new booking
   * @param room
   */
  selectRoom(room): void {
    this.selectedRoom = room;
  }
  
  /**
   * Count booking price
   */
  countPrice() {
    const today = new Date();
    const start = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    }).format(today);
    const end = new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }).format(this.evictionDate.nativeElement.valueAsDate);
    
    const days = this.bookingService.getDaysCount(start, end);
    
    if(this.selectedRoom && this.selectedRoom.price && days) {
      this.bookingPrice = this.selectedRoom.price * days;
    } else {
      this.bookingPrice = 0;
    }
  }
  
  /**
   * To save new booking
   */
  saveBooking() {
    
    let room = this.selectedRoom;
    let client = this.selectedClient;
    this.bookingService.addBooking(room, client, this.currentDateString, this.evictionDate.nativeElement.value, this.bookingPrice, 2).subscribe(data => {
      alert('Заявка оформлена.');
      this.router.navigate(['request-list'])
    });
  }

}
