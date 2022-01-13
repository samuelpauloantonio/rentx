import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from '@modules/accounts/useCases/refreshToken/refreshTokenUseCase';

export class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { refresh_token: refresh } =
            request.body || request.headers['x-access-token'] || request.query;
        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
        const refresh_token = await refreshTokenUseCase.execute(refresh);

        return response.json({ refresh_token });
    }
}
