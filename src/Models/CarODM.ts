import { Model, Schema, model, models, isValidObjectId } from 'mongoose';
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
}

export default CarODM;