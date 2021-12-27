import { CreateCarDTO } from '../dto/createCarDTO';
import { Car } from '../infra/typeorm/entities/car';
import { ISearchCars } from '../useCases/listAvailableCars/listAvailableCarsUseCase';

export interface ICarRepository {
    create(data: CreateCarDTO): Promise<Car>;
    findByLicencePlate(license_plate: string): Promise<Car>;
    listAllCarsAvailable({
        brand,
        name,
        category_id,
    }: ISearchCars): Promise<Car[]>;

    findOne(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}
