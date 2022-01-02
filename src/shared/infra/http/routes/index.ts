import express from 'express';
import { userRoutes } from '@shared/infra/http/routes/users.routes';
import CategoriesRoutes from '@shared/infra/http/routes/categories.routes';
import { authenticateUserRouter } from '@shared/infra/http/routes/autheticateUser.routes';

import SpecificationRoutes from '@shared/infra/http/routes/specifications.routes';
import { passwordRoutes } from '@shared/infra/http/routes/password.routes';
import { carsRouter } from './cars.routes';
import { rentalRouter } from './rentals.routes';

const routes = express.Router();
routes.get('/', (request, response) => {
    return response.json('ok');
});
routes.use('/categories', CategoriesRoutes);
routes.use('/specifications', SpecificationRoutes);
routes.use('/cars', carsRouter);
routes.use('/users', userRoutes);
routes.use('/rentals', rentalRouter);
routes.use('/password', passwordRoutes);
routes.use(authenticateUserRouter);

export default routes;
