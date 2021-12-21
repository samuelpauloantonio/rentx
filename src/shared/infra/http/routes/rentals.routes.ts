import { CreateRentalController } from '@modules/rentals/useCases/createRentals/createrentalsUSeCaseController';
import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);

export { rentalRouter };
