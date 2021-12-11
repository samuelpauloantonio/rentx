import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/erros/AppError';
import { ISignUSerDTO } from '@modules/accounts/dtos/IsingUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';

interface IResponseSign {
    user: {
        name: string;
        email: string;
    };

    token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute({ email, password }: ISignUSerDTO): Promise<IResponseSign> {
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user || !(await compare(password, user.password))) {
                throw new AppError('Email  or password incorrect!');
            }

            const token = sign({}, '4bbd720299346eda6141790d1e4b7e5e', {
                subject: user.id,
                expiresIn: '1d',
            });

            return {
                user: {
                    name: user.name,
                    email: user.email,
                },
                token,
            };
        } catch (error) {
            throw new AppError(error);
        }
    }
}
