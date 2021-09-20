import express from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/ImportCategory/ImportCategoryController';
import { ListCategoryController } from '../modules/cars/useCases/ListCategories/ListCategoriesController';

const upload = multer({
    dest: './tmp',
});

const CategoriesRouter = express.Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();
CategoriesRouter.post('/', createCategoryController.handle);

CategoriesRouter.get('/', listCategoryController.handle);

CategoriesRouter.get('/:id', listCategoryController.handle);
CategoriesRouter.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle,
);

export default CategoriesRouter;
