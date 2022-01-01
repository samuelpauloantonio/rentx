import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/erros/AppError';
import AuthConfig from '@config/auth';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';

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

        const userRepository = new UserRepository();

        const [, token] = authHeader.split(' ');

        const { secret_token } = AuthConfig;
        const { sub: user_id } = verify(token, secret_token) as IPayload;

        const user = await userRepository.findById(user_id);

        if (!user) throw new AppError('User Does Not found');

        request.user = {
            id: user.id,
        };

        next();
    } catch (error) {
        console.log(error.message);
        throw new AppError('Invalid token', 401);
    }
}
