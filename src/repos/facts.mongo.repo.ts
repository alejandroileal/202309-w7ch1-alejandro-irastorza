import { Fact } from '../entities/fact';
import { FactModel } from './facts.mongo.model.js';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';
import createDebug from 'debug';

const debug = createDebug('W7E:notes:mongo:repo');

export class FactsMongoRepo implements Repository<Fact> {
  constructor() {
    debug('Instantiated');
  }

  async search({
    _key,
    _value,
  }: {
    _key: string;
    _value: unknown;
  }): Promise<Fact[]> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<Fact[]> {
    const result = await FactModel.find();
    return result;
  }

  async getById(id: string): Promise<Fact> {
    const result = await FactModel.findById(id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Fact, 'id'>): Promise<Fact> {
    const result: Fact = await FactModel.create(newItem);
    return result;
  }

  async update(id: string, updatedItem: Partial<Fact>): Promise<Fact> {
    const result = await FactModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await FactModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
