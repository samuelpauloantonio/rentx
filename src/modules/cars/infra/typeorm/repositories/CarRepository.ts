import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
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
    }: CreateCarDTO): Promise<Car> {
        const car = this.carRepository.create({
            name,
            description,
            daily_rate,
            category_id,
            license_plate,
            fine_amount,
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
}
