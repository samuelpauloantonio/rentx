import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { AppError } from '@shared/erros/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';

import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

// dayjs.extend(utc);

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
export class CreateRentalsUseCase {
    constructor(
        @inject('RentalRepository')
        private readonly rentalRepository: IRentalRepository,
        @inject('DayJsDateProvider')
        private readonly dateProvider: IDateProviders,
        @inject('CarRepository')
        private CarRepository: ICarRepository,
    ) {}

    async execute({
        car_id,
        expected_return_date,
        user_id,
    }: IRequest): Promise<Rental> {
        const minumHour = 24;

        const carUnavalible = await this.rentalRepository.findOpenRentalByCar(
            car_id,
        );

        if (carUnavalible) {
            throw new AppError('Car is Unavailable');
        }

        const rentalsOpenToUser =
            await this.rentalRepository.findOpenRentalByUser(user_id);

        if (rentalsOpenToUser) {
            throw new AppError('Theres a rental in progress for user ');
        }
        const dateNow = this.dateProvider.dateNow();
        const compareDate = this.dateProvider.compareDateInHour(
            dateNow,
            expected_return_date,
        );

        if (compareDate < minumHour) {
            throw new AppError('Invalid Time Date');
        }
        const rental = await this.rentalRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        await this.CarRepository.updateAvailable(car_id, false);

        return rental;
    }
}
