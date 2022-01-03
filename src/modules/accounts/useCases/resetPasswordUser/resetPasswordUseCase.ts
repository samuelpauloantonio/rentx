import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { AppError } from '@shared/erros/AppError';
import { hash } from 'bcrypt';

interface IRequest {
    refresh_token: string;
    password: string;
}

@injectable()
export class ResetPasswordUseCase {
    constructor(
        @inject('UserRepository')
        private readonly UserRepository: IUserRepository,
        @inject('DayJsDateProvider')
        private readonly DateProvider: IDateProviders,

        @inject('UserTokenRepository')
        private readonly UserTokenRepository: IUserTokenRepository,
    ) {}

    async execute({ password, refresh_token }: IRequest): Promise<void> {
        const userRefreshToken =
            await this.UserTokenRepository.findByRefreshToken(refresh_token);

        if (!userRefreshToken) {
            throw new AppError('Invalid refresh token', 401);
        }

        if (
            this.DateProvider.compareIfBefore(
                userRefreshToken.expires_date,
                this.DateProvider.dateNow(),
            )
        ) {
            throw new AppError('Token expired');
        }

        const user = await this.UserRepository.findById(
            userRefreshToken.user_id,
        );

        user.password = await hash(password, 8);
        await this.UserRepository.findByIdAndUpdate(user);

        await this.UserTokenRepository.deleteRefreshToken(userRefreshToken.id);
    }
}
