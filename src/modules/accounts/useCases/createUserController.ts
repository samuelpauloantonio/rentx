import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUserUseCase';

export class UserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase);
        const { name, password, email, driver_license } = request.body;

        await createUserUseCase.execute({
            name,
            password,
            email,
            driver_license,
        });

        return response.status(200).send();
    }
}
