import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export default (): ImportCategoryController => {
    const categoryRepository = new CategoriesRespository();
    const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
    const importCategoryController = new ImportCategoryController(
        importCategoryUseCase,
    );

    return importCategoryController;
};
