import IVehicle from './IVehicle';

interface Car extends IVehicle {
  doorsQty: number,
  seatsQty: number
}
  
export default Car;