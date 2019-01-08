export class Client {
  public address: string;
  public birthDate: string;
  public countVisits: number;
  public idClient: number;
  public name: string;
  public passport: string;
  public phone: string;
  
  constructor(address: string, birthDate: string, countVisits: number, idClient: number, name: string, passport: string, phone: string) {
    this.idClient = idClient;
    this.name = name;
    this.countVisits = countVisits;
    this.passport = passport;
    this.birthDate = birthDate;
    this.address = address;
    this.phone = phone;
  }
}
