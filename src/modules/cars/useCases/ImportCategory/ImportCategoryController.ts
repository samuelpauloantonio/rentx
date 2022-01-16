import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { file } = request;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        await importCategoryUseCase.excute(file);
        return response.send('upload de arquivo feito');
    }
}

export { ImportCategoryController };
