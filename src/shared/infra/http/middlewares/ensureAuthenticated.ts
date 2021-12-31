/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/erros/AppError';
import AuthConfig from '@config/auth';
import { UserRefreshRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokenRepository';

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) throw new AppError('token is missing!', 401);

        const userRefreshRepository = new UserRefreshRepository();

        const [, token] = authHeader.split(' ');

        const { secret_refresh_token } = AuthConfig;
        const { sub: user_id } = verify(
            token,
            secret_refresh_token,
        ) as IPayload;

        const user = await userRefreshRepository.findOneByUserAndRefreshToken(
            user_id,
            token,
        );

        if (!user) throw new AppError('User Does Not found');

        request.user = {
            id: user.id,
        };

        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}
