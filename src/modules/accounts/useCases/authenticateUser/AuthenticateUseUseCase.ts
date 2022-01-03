import { compare } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/erros/AppError';
import { ISignUSerDTO } from '@modules/accounts/dtos/IsingUserDTO';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import AuthConfig from '@config/auth';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';

interface IResponseSign {
    user: {
        name: string;
        email: string;
    };

    token: string;
    refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @inject('DayJsDateProvider')
        private readonly providerDate: DayjsProvider,
        @inject('UserTokenRepository')
        private readonly userRefreshToken: IUserTokenRepository,
    ) {}

    async execute({ email, password }: ISignUSerDTO): Promise<IResponseSign> {
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user || (user && !(await compare(password, user.password)))) {
                throw new AppError('Email  or password incorrect!');
            }

            const {
                expires_in_refresh_token,
                expires_in_refresh_token_days,
                expires_in_token,
                secret_refresh_token,
                secret_token,
            } = AuthConfig;

            const token = sign({}, secret_token, {
                subject: user.id,
                expiresIn: expires_in_token,
            });

            const refresh_token = sign(
                {
                    email: user.email,
                },
                secret_refresh_token,
                {
                    subject: user.id,
                    expiresIn: expires_in_refresh_token,
                },
            );

            await this.userRefreshToken.create({
                user_id: user.id,
                refresh_token,
                expires_date: this.providerDate.addDays(
                    expires_in_refresh_token_days,
                ),
            });

            return {
                user: {
                    name: user.name,
                    email: user.email,
                },
                token,
                refresh_token,
            };
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
