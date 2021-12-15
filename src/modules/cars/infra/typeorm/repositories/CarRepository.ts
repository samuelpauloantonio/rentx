import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ISearchCars } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Car } from '../entities/car';

@EntityRepository(Car)
export class CarRepository implements ICarRepository {
    private carRepository: Repository<Car>;

    constructor() {
        this.carRepository = getRepository(Car);
    }

    async create({
        name,
        description,
        daily_rate,
        category_id,
        license_plate,
        fine_amount,
        brand,
    }: CreateCarDTO): Promise<Car> {
        const car = this.carRepository.create({
            name,
            description,
            daily_rate,
            category_id,
            license_plate,
            fine_amount,
            brand,
        });

        const carSaved = await this.carRepository.save(car);

        return carSaved;
    }

    async findByLicencePlate(license_plate: string): Promise<Car> {
        const car = await this.carRepository.findOne({
            license_plate,
        });
        return car;
    }

    async listAllCarsAvailable({
        brand,
        name,
        category_id,
    }: ISearchCars): Promise<Car[]> {
        const carsQuery = await this.carRepository
            .createQueryBuilder('c')
            .where('available = :available', { available: true });

        if (name) {
            carsQuery.andWhere('name = :name', { name });
        }

        if (brand) {
            carsQuery.andWhere('brand = :brand', { brand });
        }

        if (category_id) {
            carsQuery.andWhere('category_id = :category_id', { category_id });
        }

        const results = await carsQuery.getMany();

        return results;
    }
}
