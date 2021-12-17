import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { Router } from 'express';
import { ensureAdmin } from 'shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCaseController';
import { CreateCarSpecificationsCarsController } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationsController';

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecificationsController =
    new CreateCarSpecificationsCarsController();

carsRouter.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);

carsRouter.get('/available', listAvailableCars.handle);

carsRouter.post(
    '/specifications/car_id/:car_id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationsController.handle,
);

export { carsRouter };
