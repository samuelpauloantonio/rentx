import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';

export class RentalRepository implements IRentalRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }

    findOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error('Method not implemented.');
    }
}
