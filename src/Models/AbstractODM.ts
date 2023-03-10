import { Model, Schema, model, models, isValidObjectId, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  protected schema: Schema;
  protected model: Model<T>;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findOne(id: string): Promise<T | null | Error> {
    if (!isValidObjectId(id)) {
      throw Error('Invalid mongo id');
    }

    return this.model.findById(id);
  }

  public async updateOne(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw Error('Invalid mongo id');
    }

    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );   
  }
}

export default AbstractODM;