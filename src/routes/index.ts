import express from 'express';
import { authenticateUserRouter } from './autheticateUser.routes';

import CategoriesRoutes from './categories.routes';
import SpecificationRoutes from './specifications.routes';
import { userRoutes } from './users.routes';

const routes = express.Router();
routes.get('/', (request, response) => {
    return response.json('ok');
});
routes.use('/categories', CategoriesRoutes);
routes.use('/specifications', SpecificationRoutes);
routes.use('/users', userRoutes);
routes.use(authenticateUserRouter);

export default routes;
