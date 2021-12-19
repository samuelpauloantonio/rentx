import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { AppError } from '@shared/erros/AppError';

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

export class CreateRentalsUseCase {
    constructor(private readonly rentalRepository: IRentalRepository) {}

    async execute({ car_id, expected_return_date, user_id }: IRequest) {
        // O aluguel deve ter duração mínima de 24 horas . <br/>
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

        const rental = await this.rentalRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}
