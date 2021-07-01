import express from 'express';
import multer from 'multer';
import { CategoriesRespository } from '../modules/cars/repositories/implementations/CategoriesRespository';
import CategoriesServicesFindOne from '../modules/cars/services/findOne.services';
import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { importCategoryController } from '../modules/cars/useCases/ImportCategory';
import { listCategoriesController } from '../modules/cars/useCases/ListCategories';

const upload = multer({
    dest: './tmp',
});

const categoriesRepository = CategoriesRespository.getInstance();
const categoryServiceFindOne = new CategoriesServicesFindOne(
    categoriesRepository,
);
const CategoriesRouter = express.Router();

CategoriesRouter.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
});

CategoriesRouter.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
});

CategoriesRouter.get('/:id', (request, response) => {
    const category = categoryServiceFindOne.execute(request.params.id);

    return response.json(category);
});
CategoriesRouter.post('/import', upload.single('file'), (request, response) => {
    return importCategoryController.handle(request, response);
});

export default CategoriesRouter;
