import { Rental } from '@modules/rentals/infra/typeorm/entity/Rentals';
import { IRentalRepository } from '@modules/rentals/repositories/IrentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListRentalByUserUseCase {
    constructor(
        @inject('RentalRepository')
        private readonly rentalRepository: IRentalRepository,
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentals = await this.rentalRepository.listAll(user_id);

        return rentals;
    }
}
