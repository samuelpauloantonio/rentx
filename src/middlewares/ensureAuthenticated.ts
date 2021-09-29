import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UserRepository } from '../modules/accounts/repositories/implementations/UserRepository';

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

        if (!authHeader) throw new Error('token is missing!');

        const [, token] = authHeader.split(' ');

        const { sub: user_id } = verify(
            token,
            '4bbd720299346eda6141790d1e4b7e5e',
        ) as IPayload;

        const user = await new UserRepository().findById(user_id);

        if (!user) throw new Error('User Does Not found');

        next();
    } catch (error) {
        throw new Error('Invalid token');
    }
}
