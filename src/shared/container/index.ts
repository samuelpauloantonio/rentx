import { container } from 'tsyringe';
import '@shared/container/providers';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRespository } from '@modules/cars/infra/typeorm/repositories/CategoriesRespository';
import SpecificationRepository from '@modules/cars/infra/typeorm/repositories/SpecificationRespository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { CarRepository } from '@modules/cars/infra/typeorm/repositories/CarRepository';
import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';
import { CarImageRepository } from '@modules/cars/infra/typeorm/repositories/CarImageRepository';
import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { RentalRepository } from '@modules/rentals/infra/typeorm/repositories/rentalsRepository';
import { IUserTokenRepository } from '@modules/cars/repositories/IUserTokenRepository';
import { UserRefreshRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoriesRespository,
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);

container.registerSingleton<ICarImageRepository>(
    'CarImageRepository',
    CarImageRepository,
);

container.registerSingleton<IRentalRepository>(
    'RentalRepository',
    RentalRepository,
);

container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserRefreshRepository,
);
