import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUseUseCase';
import { ISignUSerDTO } from '@modules/accounts/dtos/IsingUserDTO';

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password }: ISignUSerDTO = request.body;
        const authenticateUserUsecase = container.resolve(
            AuthenticateUserUseCase,
        );

        const token = await authenticateUserUsecase.execute({
            email,
            password,
        });

        return response.status(200).json(token);
    }
}

export { AuthenticateUserController };
