import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './createSpecificationUseCase';

class CreateSpecificationController {
    constructor(
        private createSpecificationUsecase: CreateSpecificationUseCase,
    ) {}

    public handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        this.createSpecificationUsecase.execute({ name, description });

        return response.status(201).send();
    }
}
export { CreateSpecificationController };
