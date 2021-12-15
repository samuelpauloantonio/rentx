import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { inject, injectable } from 'tsyringe';

export interface ISearchCars {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
    constructor(
        @inject('CarRepository')
        private carsRepository: ICarRepository,
    ) {}

    async execute({ brand, name, category_id }: ISearchCars): Promise<Car[]> {
        const cars = await this.carsRepository.listAllCarsAvailable({
            brand,
            name,
            category_id,
        });
        return cars;
    }
}
