import { Request, Response } from 'express';
import { CreateCategoriesUseCase } from './createCategoriesUseCase';

class CreateCategoryController {
    constructor(private createCategoriesUseCase: CreateCategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        this.createCategoriesUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController, CreateCategoriesUseCase };
