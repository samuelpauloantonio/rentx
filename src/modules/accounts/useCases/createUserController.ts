import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';

export class UserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const createUserUseCase = container.resolve(CreateUserUseCase);
            const { name, password, email, driver_license } = request.body;

            await createUserUseCase.execute({
                name,
                password,
                email,
                driver_license,
            });

            return response.status(200).send();
        } catch (error) {
            return response.status(400).json(error.message);
        }
    }
}
