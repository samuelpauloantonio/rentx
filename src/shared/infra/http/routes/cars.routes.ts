import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { Router } from 'express';
import { ensureAdmin } from 'shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCaseController';

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();

carsRouter.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);

carsRouter.get('/available', listAvailableCars.handle);

export { carsRouter };
