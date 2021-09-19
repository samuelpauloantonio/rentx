import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoryController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const categories = await this.listCategoriesUseCase.execute(id);

        return response.status(200).json(categories);
    }
}
export { ListCategoryController };
