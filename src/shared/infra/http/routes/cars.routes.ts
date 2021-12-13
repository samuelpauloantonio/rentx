import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { Router } from 'express';
import { ensureAdmin } from 'shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRouter = Router();
const createCarController = new CreateCarController();

carsRouter.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle,
);

export { carsRouter };
