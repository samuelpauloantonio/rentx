import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/erros/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequestCreateCarSpecification {
    car_id: string;
    specifications: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
    constructor(
        @inject('CarRepository')
        private readonly carRepository: ICarRepository,

        @inject('SpecificationsRepository')
        private readonly specificationRepository: ISpecificationsRepository,
    ) {}

    async execute({
        car_id,
        specifications,
    }: IRequestCreateCarSpecification): Promise<Car> {
        try {
            const checkIfCarExist = await this.carRepository.findOne(car_id);

            if (!checkIfCarExist) throw new AppError('Car not  found');

            const specificationsFiltereds =
                await this.specificationRepository.findByIds(specifications);

            checkIfCarExist.specifications = specificationsFiltereds;

            const result = await this.carRepository.create(checkIfCarExist);

            return result;
        } catch (error) {
            return error;
        }
    }
}
