import express from 'express';
import createSpecificationController from '../modules/cars/useCases/createSpecifications';

const specificationRouter = express.Router();

specificationRouter.post('/', (request, response) => {
    return createSpecificationController().handle(request, response);
});

export default specificationRouter;
