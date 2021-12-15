import { CreateCarDTO } from '@modules/cars/dto/createCarDTO';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateCarUseCase } from './createCarUseCase';

export class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createCarUsecase = container.resolve(CreateCarUseCase);
        const {
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            brand,
        }: CreateCarDTO = request.body;

        const car = await createCarUsecase.execute({
            name,
            description,
            fine_amount,
            category_id,
            daily_rate,
            license_plate,
            brand,
        });

        return response.status(201).json(car);
    }
}
