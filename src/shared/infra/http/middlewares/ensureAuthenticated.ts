/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/erros/AppError';

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

        const [, token] = authHeader.split(' ');

        const { sub: user_id } = verify(
            token,
            '4bbd720299346eda6141790d1e4b7e5e',
        ) as IPayload;

        const user = await new UserRepository().findById(user_id);

        if (!user) throw new AppError('User Does Not found');

        request.user = {
            id: user.id,
        };

        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
}
