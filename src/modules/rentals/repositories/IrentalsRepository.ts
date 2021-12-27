import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';
import { CreateRentalDTO } from '@modules/rentals/dtos/createRentalDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';

export interface IRentalRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(data: CreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental>;
}
