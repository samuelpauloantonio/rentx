import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    public handle(request: Request, response: Response): Response {
        const { file } = request;

        this.importCategoryUseCase.excute(file);
        return response.send('upload de arquivo feito');
    }
}

export { ImportCategoryController };
