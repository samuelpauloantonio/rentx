import { CarImage } from '../infra/typeorm/entities/carImage';

interface IRequestICarImage {
    car_id: string;
    image_name: string;
}

interface ICarImageRepository {
    create({ car_id, image_name }: IRequestICarImage): Promise<CarImage>;
}

export { ICarImageRepository, IRequestICarImage };
