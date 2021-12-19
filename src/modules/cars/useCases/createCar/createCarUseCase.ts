import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { AppError } from '@shared/erros/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject('CarRepository')
        private carRepository: ICarRepository,
    ) {}

    async execute({
        name,
        description,
        fine_amount,
        category_id,
        daily_rate,
        license_plate,
        brand,
    }: CreateCarDTO): Promise<Car> {
        const checkCarIfAlreadyExists =
            await this.carRepository.findByLicencePlate(license_plate);

        if (checkCarIfAlreadyExists)
            throw new AppError('Car with this plate already exists');

        const car = await this.carRepository.create({
            name,
            description,
            fine_amount,
            category_id,
            daily_rate,
            license_plate,
            brand,
        });

        return car;
    }

    async findByLicencePlateService(license_plate: string): Promise<Car> {
        const findCar = await this.carRepository.findByLicencePlate(
            license_plate,
        );

        if (findCar) throw new AppError('Car with this plate not found');

        return findCar;
    }
}
