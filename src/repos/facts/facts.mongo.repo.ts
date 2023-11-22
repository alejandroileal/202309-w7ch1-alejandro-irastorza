import { Fact } from '../../entities/fact';
import { FactModel } from './facts.mongo.model.js';
import { Repository } from '../repo';
import { HttpError } from '../../types/http.error.js';
import createDebug from 'debug';
import { UsersMongoRepo } from '../users/users.mongo.repo.js';

const debug = createDebug('W7E:notes:mongo:repo');

export class FactsMongoRepo implements Repository<Fact> {
  userRepo: UsersMongoRepo;
  constructor() {
    debug('Instantiated');
    this.userRepo = new UsersMongoRepo();
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
    const result = await FactModel.find()
      .populate('author', {
        facts: 0,
      })
      .exec();
    return result;
  }

  async getById(id: string): Promise<Fact> {
    const result = await FactModel.findById(id).populate('author', {
      facts: 0,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Fact, 'id'>): Promise<Fact> {
    const userId = newItem.author.id;
    newItem.author = await this.userRepo.getById(userId);
    const result: Fact = await FactModel.create(newItem);

    // If (!newItem.author.facts) {
    //   throw new HttpError(404, 'Not found');
    // }

    newItem.author.facts.push(result.id as unknown as Fact);
    debug(newItem.author);
    await this.userRepo.update(userId, newItem.author);
    return result;
  }

  async update(id: string, updatedItem: Partial<Fact>): Promise<Fact> {
    const result = await FactModel.findByIdAndUpdate(id, updatedItem, {
      new: true,
    }).populate('author', {
      facts: 0,
    });
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    return result;
  }

  async delete(id: string): Promise<void> {
    const result = await FactModel.findByIdAndDelete(id).populate('author', {
      facts: 0,
    });
    if (!result) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }
  }
}
