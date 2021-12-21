import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { AppError } from '@shared/erros/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProviders } from '@shared/container/providers/DateProvides/IDateProviders';

dayjs.extend(utc);

// dayjs.extend(utc);

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

export class CreateRentalsUseCase {
    constructor(
        private readonly rentalRepository: IRentalRepository,
        private readonly dateProvider: IDateProviders,
    ) {}

    async execute({
        car_id,
        expected_return_date,
        user_id,
    }: IRequest): Promise<Rental> {
        const minumHour = 24;
        // Não deve ser possivel cadatrar um novo aluguel caso  já exista um aberto  para o mesmo carro . <br/>

        const carUnavalible = await this.rentalRepository.findOpenRentalByCar(
            car_id,
        );

        if (carUnavalible) {
            throw new AppError('Car is Unavailable');
        }

        // Não deve ser possivel cadatrar um novo aluguel caso  já exista um aberto  para o mesmo usuário . <br/>
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

        return rental;
    }
}
