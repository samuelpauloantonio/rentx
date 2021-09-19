import express from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/CreateCategory';
import importCategoryController from '../modules/cars/useCases/ImportCategory';
import listCategoriesController from '../modules/cars/useCases/ListCategories';

const upload = multer({
    dest: './tmp',
});

const CategoriesRouter = express.Router();

CategoriesRouter.post('/', (request, response) => {
    return createCategoryController().handle(request, response);
});

CategoriesRouter.get('/', (request, response) => {
    return listCategoriesController().handle(request, response);
});

CategoriesRouter.get('/:id', (request, response) => {
    const category = listCategoriesController().handle(request, response);

    return response.json(category);
});
CategoriesRouter.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController().handle(request, response);
});

export default CategoriesRouter;
