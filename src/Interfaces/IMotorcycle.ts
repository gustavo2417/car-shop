import IVehicle from './IVehicle';

interface Motorcycle extends IVehicle {
  category: 'Street' | 'Custom' | 'Trail',
  engineCapacity: number
}
    
export default Motorcycle;