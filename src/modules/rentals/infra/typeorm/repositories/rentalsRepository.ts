import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';
import { CreateRentalDTO } from '@modules/rentals/dtos/createRentalDTO';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Car } from '@modules/cars/infra/typeorm/entities/car';

@EntityRepository(Rental)
export class RentalRepository implements IRentalRepository {
    private rentalRepository: Repository<Rental>;

    constructor() {
        this.rentalRepository = getRepository(Rental);
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.rentalRepository.findOne(id);
        return rental;
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: CreateRentalDTO): Promise<Rental> {
        const rental = this.rentalRepository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        });

        await this.rentalRepository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rentalOpenByCar = await this.rentalRepository.findOne({
            where: { car_id, end_date: null },
        });
        return rentalOpenByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rentalOpenByUser = await this.rentalRepository.findOne({
            where: { user_id, end_date: null },
        });
        return rentalOpenByUser;
    }
}
