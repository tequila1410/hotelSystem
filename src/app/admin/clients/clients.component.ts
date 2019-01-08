import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientsService} from './clients.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit, OnDestroy {
  /**
   * Option to filter clients
   * @type {string}
   */
  filterOption: string = 'name';
  
  /**
   * Array of clients
   * @type {any[]}
   */
  clients: any[] = [];
  
  /**
   * Array of filtered clients
   * @type {any[]}
   */
  filteredClients: any[] = [];
  
  /**
   * Selected client
   */
  selectedClient: any;
  
  /**
   * If block with detail info is visible
   * @type {boolean}
   */
  isDetailInfoVisible: boolean = false;
  
  /**
   * If block to edit client's info is visible
   * @type {boolean}
   */
  isEditClientBlockVisible: boolean = false;
  
  /**
   * Contains subscriptions which react on clients data change
   * @type {Subscription}
   */
  getAllClientsSubscription: Subscription;

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.getAllClientsSubscription = this.clientsService.getAllClients().subscribe((data: any) => {
      this.clients = [...data];
      this.filteredClients = [...data];
    })
  }
  
  searchValueChange(searchStr: string) {
    console.log(this.filterOption);
    
    this.filteredClients = this.clients.filter((client) => {
      if (client.hasOwnProperty(this.filterOption) && client[this.filterOption].startsWith(searchStr)) {
        return client;
      }
    })
  }
  
  /**
   * Select client for more info or changing
   */
  selectClient(client: any) {
    this.isDetailInfoVisible = true;
    this.isEditClientBlockVisible = false;
    this.selectedClient = client;
  }
  
  showEditBlock() {
    this.isDetailInfoVisible = false;
    this.isEditClientBlockVisible = true;
  }
  
  ngOnDestroy() {
    if (this.getAllClientsSubscription) this.getAllClientsSubscription.unsubscribe();
  }

}
