import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';
import {
    CreateCategoryController,
    CreateCategoriesUseCase,
} from './CreateCategoryController';

export default (): CreateCategoryController => {
    const categoryRepository = new CategoriesRespository();
    const createCategoriesUseCase = new CreateCategoriesUseCase(
        categoryRepository,
    );
    const createCategoryController = new CreateCategoryController(
        createCategoriesUseCase,
    );

    return createCategoryController;
};
