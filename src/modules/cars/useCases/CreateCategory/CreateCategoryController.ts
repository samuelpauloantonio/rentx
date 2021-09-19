import { Request, Response } from 'express';
import { CreateCategoriesUseCase } from './createCategoriesUseCase';

class CreateCategoryController {
    constructor(private createCategoriesUseCase: CreateCategoriesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, description } = request.body;

            await this.createCategoriesUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (error) {
            return response.status(400).send(error);
        }
    }
}

export { CreateCategoryController, CreateCategoriesUseCase };
