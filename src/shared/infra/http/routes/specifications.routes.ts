import express from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecifications/createSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const specificationRouter = express.Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post(
    '/',
    ensureAuthenticated,
    createSpecificationController.handle,
);

export default specificationRouter;
