import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvaterUseCase } from '@modules/accounts/useCases/UpdateUseAvater/updateUserAvatarUseCase';

class UpdateUserAvaterController {
    async handle(request: Request, response: Response): Promise<Response> {
        const updateUserAvaterUseCase = container.resolve(
            UpdateUserAvaterUseCase,
        );

        const avatar_file = request.file.filename;
        const { id } = request.user;
        await updateUserAvaterUseCase.execute({ avatar_file, user_id: id });

        return response.status(204).send();
    }
}

export { UpdateUserAvaterController };
