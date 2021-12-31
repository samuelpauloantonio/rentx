import { inject, injectable } from 'tsyringe';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { IUserTokenRepository } from '@modules/cars/repositories/IUserTokenRepository';
import { verify, sign } from 'jsonwebtoken';
import AuthConfig from '@config/auth';
import { AppError } from '@shared/erros/AppError';

type IPayloadToken = {
    sub: string;
    email: string;
};

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject('DayJsDateProvider')
        private readonly dateProvider: IDateProviders,
        @inject('UserTokenRepository')
        private readonly userTokenRepository: IUserTokenRepository,
    ) {}

    async execute(refreshToken: string): Promise<string> {
        const {
            expires_in_refresh_token_days,
            expires_in_refresh_token,
            secret_refresh_token,
        } = AuthConfig;

        const { sub: user_id, email } = verify(
            refreshToken,
            secret_refresh_token,
        ) as IPayloadToken;

        const userRefreshToken =
            await this.userTokenRepository.findOneByUserAndRefreshToken(
                user_id,
                refreshToken,
            );

        if (!userRefreshToken) {
            throw new AppError('Refresh token invalid', 401);
        }

        await this.userTokenRepository.deleteRefreshToken(userRefreshToken.id);

        const newRefreshToken = sign({ email }, secret_refresh_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token,
        });

        await this.userTokenRepository.create({
            user_id,
            expires_date: this.dateProvider.addDays(
                expires_in_refresh_token_days,
            ),
            refresh_token: newRefreshToken,
        });

        return newRefreshToken;
    }
}
