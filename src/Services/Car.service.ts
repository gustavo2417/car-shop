import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createDomainCar(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(newCar: ICar) {
    const carODM = new CarODM();
    const createNewCar = await carODM.create(newCar);
    return this.createDomainCar(createNewCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const allCars = await carODM.find();
    const carsArray = allCars.map((car) => 
      this.createDomainCar(car));
    return carsArray;
  }

  public async getOneCar(id: string) {
    const carODM = new CarODM();
    const getCar = await carODM.findOne(id);
    if (!getCar) {
      throw Error('Car not found');
    }
    const returnedCar = this.createDomainCar(getCar as never);
    
    return returnedCar;
  }

  public async updateCar(id: string, update: ICar) {
    const carODM = new CarODM();
    const updateCar = await carODM.updateOne(id, update);
    if (!updateCar) {
      throw Error('Car not found');
    }
    const updatedCar = this.createDomainCar(updateCar as never);
    
    return updatedCar;
  }
}

export default CarService;