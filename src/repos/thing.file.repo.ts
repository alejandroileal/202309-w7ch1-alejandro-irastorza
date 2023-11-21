import fs from 'fs/promises';
import { Thing } from '../entities/thing';
import { Repository } from './repo';
import { HttpError } from '../types/http.error.js';

export class ThingsFileRepo implements Repository<Thing> {
  file: string;
  things: Thing[];
  constructor() {
    this.file = './data/data.json';
    this.things = [];
    this.loadData();
  }

  private async loadData() {
    const data = await fs.readFile(this.file, { encoding: 'utf-8' });
    this.things = JSON.parse(data);
  }

  async getAll(): Promise<Thing[]> {
    return this.things;
  }

  async getById(id: string): Promise<Thing> {
    const result = this.things.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'GetById not possible');
    return result;
  }

  async create(newItem: Omit<Thing, 'id'>): Promise<Thing> {
    const result: Thing = { id: crypto.randomUUID(), ...newItem };
    const newTasks = [...this.things, result];
    await this.save(newTasks as Thing[]);
    return result;
  }

  async update(id: string, updatedItem: Partial<Thing>): Promise<Thing> {
    let result = this.things.find((item) => item.id === id);
    if (!result) throw new HttpError(404, 'Not Found', 'Update not possible');
    result = { ...result, ...updatedItem } as Thing;
    const newTasks = this.things.map((item) =>
      item.id === id ? result : item
    );
    await this.save(newTasks as Thing[]);
    return result;
  }

  async delete(id: string): Promise<void> {
    const newTasks = this.things.filter((item) => item.id !== id);
    if (newTasks.length === this.things.length) {
      throw new HttpError(404, 'Not Found', 'Delete not possible');
    }

    await this.save(newTasks);
  }

  private async save(newTasks: Thing[]) {
    await fs.writeFile(this.file, JSON.stringify(newTasks), {
      encoding: 'utf-8',
    });
    this.things = newTasks;
  }
}
