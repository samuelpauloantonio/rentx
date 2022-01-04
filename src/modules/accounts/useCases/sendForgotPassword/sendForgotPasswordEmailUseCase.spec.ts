import { UserRespositoryInMemory } from '@modules/accounts/repositories/in-Memory/userRepositoryInMemory';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';
import { SendForgotPasswordUseCase } from '@modules/accounts/useCases/sendForgotPassword/sendForgotPasswordUseCase';
import { UserRefreshTokenRepositoryInMemory } from '@modules/accounts/repositories/in-Memory/userRefreshTokenRepositoryInMemory';
import { MailProviderInMemory } from '@shared/container/providers/DateDayjsProvides/in-Memory/MailProviderInMemory';
import { AppError } from '@shared/erros/AppError';

let userRepositoryInMemory: UserRespositoryInMemory;
let dateProvider: DayjsProvider;
let sendForgotPasswordToUser: SendForgotPasswordUseCase;
let userTokenRepository: UserRefreshTokenRepositoryInMemory;
let emailProvider: MailProviderInMemory;

describe('Send  email ', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRespositoryInMemory();
        userTokenRepository = new UserRefreshTokenRepositoryInMemory();
        dateProvider = new DayjsProvider();
        emailProvider = new MailProviderInMemory();

        sendForgotPasswordToUser = new SendForgotPasswordUseCase(
            userRepositoryInMemory,
            userTokenRepository,
            dateProvider,
            emailProvider,
        );
    });
    it('Should be able send a forgot password to user', async () => {
        await expect(async () => {
            await userRepositoryInMemory.create({
                name: 'json',
                email: 'sendemailtext@gmail.com',
                password: '3322',
                driver_license: '73878473483',
            });
            await sendForgotPasswordToUser.execute('sendemailtext@gmail.com');
        }).not.toBeInstanceOf(AppError);
    });

    it('Should not able to  request a reset of password if user does not exists', async () =>
        expect(async () => {
            await sendForgotPasswordToUser.execute('sendemail@gmail.com');
        }).rejects.toEqual(new AppError('User does not exists', 404)));
});
