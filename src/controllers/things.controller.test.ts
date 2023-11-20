import { Request, Response } from 'express';
import { ThingsController } from './things.controller';
import { ThingsFileRepo } from '../repos/thing.file.repo.js';

describe('Given TasksController class', () => {
  describe('When we instantiate it', () => {
    test('Then getAll should ...', async () => {
      ThingsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const controller = new ThingsController();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });

  describe('When we instantiate getById', () => {
    test('Then getAll should ...', async () => {
      ThingsFileRepo.prototype.getById = jest.fn().mockResolvedValue([{}]);

      const controller = new ThingsController();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });
  });
});
