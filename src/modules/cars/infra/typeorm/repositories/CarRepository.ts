import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { AppError } from '@shared/erros/AppError';
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
        const checkIfAlreadyExists = await this.findByLicencePlate(
            license_plate,
        );

        if (checkIfAlreadyExists) throw new AppError('Car already exists');

        const car = this.carRepository.create({
            name,
            description,
            daily_rate,
            category_id,
            license_plate,
            fine_amount,
        });

        await this.carRepository.save(car);

        return car;
    }

    async findByLicencePlate(license_plate: string): Promise<Car> {
        const car = await this.carRepository.findOne(license_plate);
        return car;
    }
}
