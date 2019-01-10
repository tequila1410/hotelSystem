import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClientsService} from './clients.service';
import {Subscription} from 'rxjs';
import {Client} from './models/client.model';

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
  clients: Client[] = [];
  
  /**
   * Array of filtered clients
   * @type {any[]}
   */
  filteredClients: Client[] = [];
  
  /**
   * Selected client
   */
  selectedClient: Client;
  
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
   * If need to add new client
   * @type {boolean}
   */
  isAddClientMode: boolean = false;
  
  /**
   * If block to add new client is visible
   * @type {boolean}
   */
  isAddClientBlockVisible: boolean = false;

  /**
   * Contains subscriptions which react on clients data change
   * @type {Subscription}
   */
  getAllClientsSubscription: Subscription;
  
  @ViewChild('changedName') changedName: any;
  @ViewChild('changedPassport') changedPassport: any;
  @ViewChild('changedPhone') changedPhone: any;
  @ViewChild('changedBDate') changedBDate: any;
  @ViewChild('changedAddress') changedAddress: any;

  constructor(private clientsService: ClientsService) {
    this.getAllClientsSubscription = this.clientsService.allClientsSubject.subscribe((clients: Client[]) => {
      this.clients = [...clients];
      this.filteredClients = [...clients];
    });
  
    this.clientsService.getAllClients();
  }
  
  /**
   * On component init
   */
  ngOnInit(): void {
  }
  
  /**
   * Implements client search
   * @param {string} searchStr
   */
  searchValueChange(searchStr: string): void {
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
  selectClient(client: any): void {
    this.isDetailInfoVisible = true;
    this.isEditClientBlockVisible = false;
    this.selectedClient = client;
    this.isAddClientMode = false;
  }
  
  /**
   * Show block to edit selected client
   */
  showEditBlock(): void {
    this.isDetailInfoVisible = false;
    this.isEditClientBlockVisible = true;
  }
  
  /**
   * Save changed client info
   */
  saveChanges(): void {
    const client = new Client(this.changedAddress.nativeElement.value, this.changedBDate.nativeElement.value, this.selectedClient.countVisits,
      this.selectedClient.idClient, this.changedName.nativeElement.value, this.changedPassport.nativeElement.value, this.changedPhone.nativeElement.value);
    this.clientsService.saveChangedClient(client).subscribe((response: { done: boolean }) => {
    if (response.done) {
      this.clientsService.getAllClients();
      this.isEditClientBlockVisible = false;
      this.isDetailInfoVisible = true;
      this.selectedClient = client;
      alert('Client\'s info changed.')
    }
    })
  }

  addNewClient(): void {
    this.isAddClientMode = true;
    this.isEditClientBlockVisible = true;
    this.isDetailInfoVisible = false;
  }

  createNewClient(): void {
    console.log('asd')

    const client: Client = new Client (this.changedAddress.nativeElement.value, this.changedBDate.nativeElement.value, null,
      null, this.changedName.nativeElement.value, this.changedPassport.nativeElement.value, this.changedPhone.nativeElement.value);
      
    this.clientsService.addNewClient(client).subscribe(data => {
      this.clientsService.getAllClients();
    })
  }

  deleteSelectedClient() {
    if (!this.isEmptyObject(this.selectedClient)) {
      this.clientsService.deleteClient(this.selectedClient.idClient).subscribe(data => {
        this.isAddClientBlockVisible = false;
        this.isAddClientMode = false;
        this.isDetailInfoVisible = false;

        const elementIndex = this.clients.findIndex(element => element.idClient === this.selectedClient.idClient);
        this.clients.splice(elementIndex, 1);
        this.filteredClients = [...this.clients];
      });
    }
  }

  isEmptyObject(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
  }

  /**
   * On component destroy
   */
  ngOnDestroy(): void {
    if (this.getAllClientsSubscription) this.getAllClientsSubscription.unsubscribe();
  }

}
