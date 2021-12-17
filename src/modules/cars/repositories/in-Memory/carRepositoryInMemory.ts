import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ISearchCars } from '@modules/cars/useCases/listAvailableCars/listAvailableCarsUseCase';
import { ICarRepository } from '../ICarRepository';

export class CarRepositoryInMemory implements ICarRepository {
    car: Car[] = [];

    async create({
        id,
        name,
        description,
        daily_rate,
        category_id,
        fine_amount,
        license_plate,
        brand,
        specifications,
    }: CreateCarDTO): Promise<Car> {
        const createCar = new Car();

        Object.assign(createCar, {
            id,
            name,
            description,
            daily_rate,
            category_id,
            fine_amount,
            license_plate,
            brand,
            specifications,
        });

        this.car.push(createCar);
        return createCar;
    }

    async findByLicencePlate(licence_plate: string): Promise<Car> {
        return this.car.find(el => el.license_plate === licence_plate);
    }

    async listAllCarsAvailable({
        brand,
        name,
        category_id,
    }: ISearchCars): Promise<Car[]> {
        return this.car.filter(el => {
            const available = el.available === true;
            if (
                available ||
                (available && brand && el.brand === brand) ||
                (available && name && el.name === name) ||
                (available && category_id && el.category_id === category_id)
            ) {
                return el;
            }

            return null;
        });
    }

    async findOne(id: string): Promise<Car> {
        return this.car.find(el => el.id === id);
    }
}
