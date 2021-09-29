import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { ISignUSerDTO } from '../../dtos/IsingUserDTO';
import { AuthenticateUserUseCase } from './AuthenticateUseUseCase';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password }: ISignUSerDTO = request.body;
            const authenticateUserUsecase = container.resolve(
                AuthenticateUserUseCase,
            );

            const token = await authenticateUserUsecase.execute({
                email,
                password,
            });

            return response.status(200).json(token);
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}

export { AuthenticateUserController };
