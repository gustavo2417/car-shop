import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class CarService {
  private createDomainMotorcycle(car: IMotorcycle | null): Motorcycle | null {
    if (car) {
      return new Motorcycle(car);
    }
    return null;
  }

  public async createMotorcycle(newMoto: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const createNewMoto = await motorcycleODM.create(newMoto);
    return this.createDomainMotorcycle(createNewMoto);
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.find();
    const carsArray = allMotorcycles.map((moto) => 
      this.createDomainMotorcycle(moto));
    return carsArray;
  }

  public async getOneMotorcycle(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const getMotorcycle = await motorcycleODM.findOne(id);
    if (!getMotorcycle) {
      throw Error('Motorcycle not found');
    }
    const returnedCar = this.createDomainMotorcycle(getMotorcycle as never);
    
    return returnedCar;
  }
}

export default CarService;