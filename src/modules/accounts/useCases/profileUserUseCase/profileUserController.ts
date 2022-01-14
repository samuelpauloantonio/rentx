import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserUSeCase } from './profileUserUsecase';

export class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;

        const profileUserUseCase = container.resolve(ProfileUserUSeCase);

        const user = await profileUserUseCase.execute(user_id);

        return response.json(user);
    }
}
