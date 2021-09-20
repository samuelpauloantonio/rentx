import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const categories = await listCategoriesUseCase.execute(id);

        return response.status(200).json(categories);
    }
}
export { ListCategoryController };
