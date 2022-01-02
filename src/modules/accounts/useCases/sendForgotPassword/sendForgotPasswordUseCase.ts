import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/cars/repositories/IUserTokenRepository';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { AppError } from '@shared/erros/AppError';
import { v4 as uuidV4 } from 'uuid';
import { IEmailProvider } from '@shared/container/providers/EmailProvider/IEmailProvider';

@injectable()
export class SendForgotPasswordUseCase {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @inject('UserTokenRepository')
        private readonly userTokenRepository: IUserTokenRepository,
        @inject('DayJsDateProvider')
        private readonly DateProvider: IDateProviders,

        @inject('EtherealEmailProvider')
        private readonly etherealEmailProvider: IEmailProvider,
    ) {}

    async execute(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists', 404);
        }

        const token = uuidV4();
        const expires_date = this.DateProvider.addHours(3);

        await this.userTokenRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date,
        });

        await this.etherealEmailProvider.sendEmail({
            to: email,
            subject: 'Recuperação de senha',
            body: `O link para o seu reset é ${token}`,
        });
    }
}
