export class Booking {
    public countClients: number;
    public dateCheck: string;
    public dateEviction: string;
    public idClient: number;
    public idOrder: number;
    public name: string;
    public number: number;
    public status: number;
    
    constructor(countClients: number, dateCheck: string, dateEviction: string, idClient: number, idOrder: number, name: string, number: number, status: number) {
      this.idClient = idClient;
      this.idOrder = idOrder;
      this.dateEviction = dateEviction;
      this.name = name;
      this.dateCheck = dateCheck;
      this.countClients = countClients;
      this.number = number;
      this.status = status;
    }
  }
  