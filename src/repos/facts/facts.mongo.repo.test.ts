import { FactsMongoRepo } from './facts.mongo.repo.js';
import { FactModel } from './facts.mongo.model.js';
import { Fact } from '../../entities/fact.js';
import { UserModel } from '../users/users.mongo.model.js';

jest.mock('./facts.mongo.model.js');
let repo: FactsMongoRepo;

describe('Given FactsMongoRepo', () => {
  const exec = jest.fn().mockResolvedValue('Test');
  const sampleFact: Fact = {
    id: '0',
    author: {
      id: '1',
      age: 8,
      email: 'sample.email@mail.com',
      facts: [],
      name: 'Sample name',
      passwd: '12345',
      surname: 'Sample surname',
    },
    fact: '',
    isVeryImportant: true,
    title: '',
  };
  describe('When we isntantiate it without errors', () => {
    beforeEach(() => {
      UserModel.findById = jest.fn().mockReturnValue({
        exec,
      });

      FactModel.find = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec,
        }),
      });

      FactModel.findById = jest.fn().mockReturnValue({
        populate: jest.fn().mockReturnValue('Test'),
      });

      FactModel.create = jest.fn().mockReturnValue('Test');

      FactModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue('Test'),
      });

      FactModel.findByIdAndDelete = jest.fn().mockReturnValue({
        populate: jest.fn().mockResolvedValue('Test'),
      });

      repo = new FactsMongoRepo();
    });

    test('Then it should execute getAll', async () => {
      const result = await repo.getAll();
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute getById', async () => {
      const result = await repo.getById(sampleFact.id);
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    // Test('Then it should execute create', async () => {
    //   const result = await repo.create(sampleFact);
    //   expect(exec).toHaveBeenCalled();
    //   expect(result).toBe('Test');
    // });

    test('Then it should execute update', async () => {
      const result = await repo.update('1', sampleFact);
      expect(exec).toHaveBeenCalled();
      expect(result).toBe('Test');
    });

    test('Then it should execute delete', async () => {
      expect(exec).toHaveBeenCalled();
    });
  });
  describe('When we isntantiate it WITH errors', () => {
    const exec = jest.fn().mockRejectedValue(new Error('Test Error'));
    beforeEach(() => {
      FactModel.findById = jest.fn().mockReturnValue({
        exec,
      });

      FactModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error()),
      });
      FactModel.findByIdAndDelete = jest.fn().mockReturnValue({
        populate: jest.fn(),
      });
    });

    test('Then it should reject getById', async () => {
      const result = repo.getById('3');
      expect(result).rejects.toThrow();
    });

    test('Then it should execute update', async () => {
      const result = repo.update('1', sampleFact);
      expect(result).rejects.toThrow();
    });

    test('Then it should reject delete', () => {
      const result = repo.delete('2');
      expect(result).rejects.toThrow();
    });

    // Test('Then it should reject search', () => {
    //   const result = repo.search();
    //   expect(result).rejects.toThrow();
    // });
  });
});
