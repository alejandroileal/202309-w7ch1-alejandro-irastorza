import { Router as createRouter } from 'express';
import { ThingsController } from '../controllers/things.controller.js';

export const thingsRouter = createRouter();

const controller = new ThingsController();

thingsRouter.get('/', controller.getAll.bind(controller));
thingsRouter.get('/:id', controller.getById.bind(controller));
thingsRouter.delete('/:idThing', controller.delete.bind(controller));
thingsRouter.post('/', controller.create.bind(controller));
thingsRouter.patch('/:idThing', controller.update.bind(controller));
