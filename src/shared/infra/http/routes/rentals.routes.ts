import { CreateRentalController } from '@modules/rentals/useCases/createRentals/createrentalsUSeCaseController';
import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalRouter.post(
    '/devolution/:id',
    ensureAuthenticated,
    devolutionRentalController.handle,
);

export { rentalRouter };
