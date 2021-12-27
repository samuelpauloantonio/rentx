import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { AppError } from '@shared/erros/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    user_id: string;
    id: string;
}

@injectable()
export class DevolutionRentalUseCase {
    constructor(
        @inject('CarRepository')
        private readonly CarRepository: ICarRepository,
        @inject('RentalRepository')
        private readonly RentalRepository: IRentalRepository,
        @inject('DayJsDateProvider')
        private readonly dateProvider: IDateProviders,
    ) {}

    async execute({ id, user_id }: IRequest) {
        const minimum_daily = 1;
        const rental = await this.RentalRepository.findById(id);
        if (!rental) {
            throw new AppError('Rental does not exist');
        }
        const car = await this.CarRepository.findOne(rental.car_id);

        if (!car) {
            throw new AppError('Car Not found');
        }
        // verificar o tempo do aluguel

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareDateInDays(
            rental.start_date,
            dateNow,
        );

        if (daily <= 0) {
            daily = minimum_daily;
        }

        const delay = this.dateProvider.compareDateInDays(
            dateNow,
            rental.expected_return_date,
        );

        let total = 0;

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.RentalRepository.create(rental);
        await this.CarRepository.updateAvailable(car.id, true);

        return rental;
    }
}
