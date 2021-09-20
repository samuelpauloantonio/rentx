import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    public async handle(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const { file } = request;

            const importCategoryUseCase = container.resolve(
                ImportCategoryUseCase,
            );
            await importCategoryUseCase.excute(file);
            return response.send('upload de arquivo feito');
        } catch (error) {
            return response.status(400).send(error);
        }
    }
}

export { ImportCategoryController };
