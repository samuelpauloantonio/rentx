import { CreateRentalDTO } from '@modules/rentals/dtos/createRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';
import { IRentalRepository } from '../IrentalsRepository';

export class RentalsRepositoryInMemory implements IRentalRepository {
    rentals: Rental[] = [];

    async create({
        car_id,
        user_id,
        expected_return_date,
    }: CreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals.push(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(car => car.car_id === car_id && !car.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            car => car.user_id === user_id && !car.end_date,
        );
    }
}
