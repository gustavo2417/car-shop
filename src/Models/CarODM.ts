import { Model, Schema, model, models, isValidObjectId, UpdateQuery } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(Car: ICar): Promise<ICar> {
    return this.model.create({ ...Car });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findOne(id: string): Promise<ICar | null | Error> {
    if (!isValidObjectId(id)) {
      throw Error('Invalid mongo id');
    }

    return this.model.findById(id);
  }

  public async updateOne(id: string, updateCar: Partial<ICar>): Promise<ICar | null> {
    if (!isValidObjectId(id)) {
      throw Error('Invalid mongo id');
    }

    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...updateCar } as UpdateQuery<ICar>,
      { new: true },
    );   
  }
}

export default CarODM;