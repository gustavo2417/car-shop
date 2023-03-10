import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/Motorcycles.service';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const car: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    if (!this.req.body.status) {
      car.status = false;
    }

    try {
      const newMotorcycle = await this.service.createMotorcycle(car);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const allMotorcycles = await this.service.getAllMotorcycles();
    return this.res.status(200).json(allMotorcycles);
  }

  public async getOne() {
    try {
      const oneMotorcycle = await this.service.getOneMotorcycle(this.req.params.id);
      return this.res.status(200).json(oneMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateOne() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    const { id } = this.req.params;

    try {
      const result = await this.service.updateMotorcycle(id, motorcycle);
      return this.res.status(200).json(result);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;