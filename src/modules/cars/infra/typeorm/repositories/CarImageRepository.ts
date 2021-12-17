import {
    ICarImageRepository,
    IRequestICarImage,
} from '@modules/cars/repositories/ICarImageRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { CarImage } from '../entities/carImage';

@EntityRepository(CarImage)
export class CarImageRepository implements ICarImageRepository {
    private CarImageRepository: Repository<CarImage>;

    constructor() {
        this.CarImageRepository = getRepository(CarImage);
    }

    async create({ car_id, image_name }: IRequestICarImage): Promise<CarImage> {
        const carImage = this.CarImageRepository.create({
            car_id,
            image_name,
        });

        await this.CarImageRepository.save(carImage);

        return carImage;
    }
}
