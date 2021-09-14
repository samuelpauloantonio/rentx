import express from 'express';

import CategoriesRoutes from './categories.routes';
import SpecificationRoutes from './specifications.routes';

const routes = express.Router();
routes.get('/', function (request, response) {
    return response.json('ok');
});
routes.use('/categories', CategoriesRoutes);
routes.use('/specifications', SpecificationRoutes);

export default routes;
