import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUseCase } from './devolutionRentalUseCase';

export class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.params;
        const { id } = request.params;

        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase,
        );

        const devolutionResponse = await devolutionRentalUseCase.execute({
            id,
            user_id,
        });

        return response.status(200).json(devolutionResponse);
    }
}
