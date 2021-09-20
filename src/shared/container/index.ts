import { container } from 'tsyringe';
import { ICategoryRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRespository } from '../../modules/cars/repositories/implementations/CategoriesRespository';

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoriesRespository,
);
