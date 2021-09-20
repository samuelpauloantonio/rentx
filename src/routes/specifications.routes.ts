import express from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecifications/createSpecificationController';

const specificationRouter = express.Router();

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post('/', createSpecificationController.handle);

export default specificationRouter;
