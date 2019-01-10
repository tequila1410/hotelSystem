export class Category {
  public idCategories: number;
  public name: string;
  public price: number;
  
  constructor(idCategories: number, name: string, price: number){
    this.idCategories = idCategories;
    this.name = name;
    this.price = price;
  }
}
  