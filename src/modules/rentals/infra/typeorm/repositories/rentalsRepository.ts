import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';
import { CreateRentalDTO } from '@modules/rentals/dtos/createRentalDTO';
import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(Rental)
export class RentalRepository implements IRentalRepository {
    private rentalRepository: Repository<Rental>;

    constructor() {
        this.rentalRepository = getRepository(Rental);
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
    }: CreateRentalDTO): Promise<Rental> {
        const rental = this.rentalRepository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.rentalRepository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rentalOpenByCar = await this.rentalRepository.findOne({ car_id });
        return rentalOpenByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rentalOpenByUser = await this.rentalRepository.findOne({
            user_id,
        });
        return rentalOpenByUser;
    }
}
