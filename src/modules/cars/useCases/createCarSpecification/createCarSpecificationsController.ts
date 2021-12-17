import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationUseCase';

export class CreateCarSpecificationsCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { car_id } = request.params;
            const { specifications_id } = request.body;

            const createSpecificationsUseCase = container.resolve(
                CreateCarSpecificationUseCase,
            );

            const car = await createSpecificationsUseCase.execute({
                car_id,
                specifications: specifications_id,
            });

            return response.status(200).json(car);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}
