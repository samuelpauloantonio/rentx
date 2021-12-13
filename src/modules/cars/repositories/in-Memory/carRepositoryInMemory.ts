import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarRepository } from '../ICarRepository';

export class CarRepositoryInMemory implements ICarRepository {
    car: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        category_id,
        fine_amount,
        license_plate,
    }: CreateCarDTO): Promise<Car> {
        const createCar = new Car();

        Object.assign(createCar, {
            name,
            description,
            daily_rate,
            category_id,
            fine_amount,
            license_plate,
        });

        this.car.push(createCar);
        return createCar;
    }

    async findByLicencePlate(licence_plate: string): Promise<Car> {
        return this.car.find(el => el.license_plate === licence_plate);
    }
}
