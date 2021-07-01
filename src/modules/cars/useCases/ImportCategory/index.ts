import { CategoriesRespository } from '../../repositories/implementations/CategoriesRespository';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoryRepository = CategoriesRespository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
const importCategoryController = new ImportCategoryController(
    importCategoryUseCase,
);

export { importCategoryController };
