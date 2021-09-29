import express from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecifications/createSpecificationController';

const specificationRouter = express.Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post(
    '/',
    ensureAuthenticated,
    createSpecificationController.handle,
);

export default specificationRouter;
