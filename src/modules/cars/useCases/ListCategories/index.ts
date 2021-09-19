import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import { ListCategoryController } from './ListCategoriesController';
import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';

export default (): ListCategoryController => {
    const categoriesRepository = new CategoriesRespository();
    const listCategoriesUseCase = new ListCategoriesUseCase(
        categoriesRepository,
    );
    const listCategoriesController = new ListCategoryController(
        listCategoriesUseCase,
    );
    return listCategoriesController;
};
