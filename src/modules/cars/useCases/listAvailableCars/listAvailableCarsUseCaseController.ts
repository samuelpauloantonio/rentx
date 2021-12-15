import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

export class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, brand, category_id } = request.query;

        const listAvailableCarsUseCase = container.resolve(
            ListAvailableCarsUseCase,
        );

        const carsList = await listAvailableCarsUseCase.execute({
            name: name as string,
            brand: brand as string,
            category_id: category_id as string,
        });

        return response.json(carsList);
    }
}
