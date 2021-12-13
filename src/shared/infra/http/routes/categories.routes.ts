import express from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/ImportCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/ListCategories/ListCategoriesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const upload = multer({
    dest: './tmp',
});

const CategoriesRouter = express.Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();
CategoriesRouter.post(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle,
);

CategoriesRouter.get(
    '/',
    ensureAuthenticated,
    ensureAdmin,
    listCategoryController.handle,
);

CategoriesRouter.get(
    '/:id',
    ensureAuthenticated,
    ensureAdmin,
    listCategoryController.handle,
);
CategoriesRouter.post(
    '/import',
    ensureAuthenticated,
    ensureAdmin,
    upload.single('file'),
    importCategoryController.handle,
);

export default CategoriesRouter;
