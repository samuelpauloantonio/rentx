import { container } from 'tsyringe';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRespository } from '@modules/cars/infran/typeorm/repositories/CategoriesRespository';
import SpecificationRepository from '@modules/cars/infran/typeorm/repositories/SpecificationRespository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoriesRespository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
