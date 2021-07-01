import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';
import {
    CreateCategoryController,
    CreateCategoriesUseCase,
} from './CreateCategoryController';

const categoryRepository = CategoriesRespository.getInstance();
const createCategoriesUseCase = new CreateCategoriesUseCase(categoryRepository);

const createCategoryController = new CreateCategoryController(
    createCategoriesUseCase,
);

export { createCategoryController };
