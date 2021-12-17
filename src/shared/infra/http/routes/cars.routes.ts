import multer from 'multer';
import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { Router } from 'express';
import { ensureAdmin } from 'shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCaseController';
import { CreateCarSpecificationsCarsController } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/uploadCarImageController';

const carsRouter = Router();
const createCarController = new CreateCarController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecificationsController =
    new CreateCarSpecificationsCarsController();

const uploadCarImageController = new UploadCarImageController();

const uploadFile = multer(uploadConfig.upload('./tmp/cars'));

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

carsRouter.post(
    '/images/:id',
    ensureAuthenticated,
    ensureAdmin,
    uploadFile.array('images'),
    uploadCarImageController.handle,
);

export { carsRouter };
