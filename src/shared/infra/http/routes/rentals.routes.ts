import { CreateRentalController } from '@modules/rentals/useCases/createRentals/createrentalsUSeCaseController';
import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/devolutionRentalController';
import { ListRentalByUserController } from '@modules/rentals/useCases/listRentalByUser/listRentalsByUserController';

const rentalRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalRouter.post('/', ensureAuthenticated, createRentalController.handle);
rentalRouter.post(
    '/devolution/:id',
    ensureAuthenticated,
    devolutionRentalController.handle,
);

rentalRouter.get(
    '/user',
    ensureAuthenticated,
    listRentalByUserController.handle,
);

export { rentalRouter };
