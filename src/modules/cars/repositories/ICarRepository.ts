import { CreateCarDTO } from '../dto/createCarDTO';
import { Car } from '../infran/typeorm/entities/car';

export interface ICarRepository {
    create(data: CreateCarDTO): Promise<Car>;
    findByLicencePlate(license_plate: string): Promise<Car>;
}
