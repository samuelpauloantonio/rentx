import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from '@modules/accounts/useCases/resetPasswordUser/resetPasswordUseCase';

export class ResetPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;

        const { password } = request.body;
        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

        await resetPasswordUseCase.execute({
            password,
            refresh_token: String(token),
        });

        return response.send('Password updated');
    }
}
