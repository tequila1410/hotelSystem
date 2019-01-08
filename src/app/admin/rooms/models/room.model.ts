export class Room {
  public categoryName: string;
  public countSeats: number;
  public countVisits: number;
  public idCategories: number;
  public idCategory: number;
  public idRoom: number;
  public isEmpty: number;
  public name: string;
  public number: number;
  public price: number;

  constructor(categoryName: string, countSeats: number, countVisits: number, 
    idCategories: number, idCategory: number, idRoom: number, isEmpty: number, name: string, number: number, price: number) {
    this.categoryName = categoryName;
    this.countSeats = countSeats;
    this.countVisits = countVisits;
    this.idCategories = idCategories;
    this.idCategory = idCategory;
    this.idRoom = idRoom;
    this.name = name;
    this.number = number;
    this.price = price;
    this.isEmpty = isEmpty;
  }
}
