import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { ListCategoryController } from './ListCategoriesController';
import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';

const categoriesRepository = CategoriesRespository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoryController(
    listCategoriesUseCase,
);

export { listCategoriesController };
