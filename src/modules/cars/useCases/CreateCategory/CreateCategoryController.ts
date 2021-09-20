import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoriesUseCase } from './createCategoriesUseCase';

class CreateCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { name, description } = request.body;
            const createCategoriesUseCase = container.resolve(
                CreateCategoriesUseCase,
            );
            await createCategoriesUseCase.execute({ name, description });

            return response.status(201).send();
        } catch (error) {
            return response.status(400).send(error);
        }
    }
}

export { CreateCategoryController, CreateCategoriesUseCase };
