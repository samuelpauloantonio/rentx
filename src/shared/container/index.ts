import { container } from 'tsyringe';
import { ICategoryRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRespository } from '../../modules/cars/repositories/implementations/CategoriesRespository';
import SpecificationRepository from '../../modules/cars/repositories/implementations/SpecificationRespository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoriesRespository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationRepository,
);
