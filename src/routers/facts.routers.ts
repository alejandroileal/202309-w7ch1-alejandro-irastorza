import { Router as createRouter } from 'express';
import { FactsController } from '../controllers/facts.controller.js';
import { FactsMongoRepo } from '../repos/facts/facts.mongo.repo.js';

export const factsRouter = createRouter();

const repo = new FactsMongoRepo();
const controller = new FactsController(repo);

factsRouter.get('/', controller.getAll.bind(controller));
factsRouter.get('/:idFact', controller.getById.bind(controller));
factsRouter.delete('/:idFact', controller.delete.bind(controller));
factsRouter.post('/createFact', controller.create.bind(controller));
factsRouter.patch('/:idFact', controller.update.bind(controller));
