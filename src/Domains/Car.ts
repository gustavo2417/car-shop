import ICar from '../Interfaces/ICar';

class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setModel(Model: string) {
    this.model = Model;
  }

  public getModel() {
    return this.model;
  }

  public setYear(Year: number) {
    this.year = Year;
  }

  public getYear() {
    return this.year;
  }

  public setColor(Color: string) {
    this.color = Color;
  }

  public getColor() {
    return this.color;
  }

  public setStatus(Status: boolean) {
    this.status = Status;
  }

  public getStatus() {
    return this.status;
  }

  public setBuyValue(BuyValue: number) {
    this.buyValue = BuyValue;
  }

  public getBuyValue() {
    return this.buyValue;
  }

  public setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }

  public setDoorsQty(DoorsQty: number) {
    this.doorsQty = DoorsQty;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }
}

export default Car;
