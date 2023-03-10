import IVehicle from '../Interfaces/IVehicle';

abstract class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status;
    this.buyValue = vehicle.buyValue;
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
}

export default Vehicle;
