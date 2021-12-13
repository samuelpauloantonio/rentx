import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { AppError } from '@shared/erros/AppError';
import { NextFunction, Request, Response } from 'express';

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const { user } = request;

    const userRepository = new UserRepository();

    const findUser = await userRepository.findById(user.id);

    if (!findUser || !findUser.isAdmin) throw new AppError("User isn't Admin");

    next();
}
