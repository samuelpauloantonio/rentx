import { AppError } from '@shared/erros/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/IcreateUserDTO';
import { UserRespositoryInMemory } from '@modules/accounts/repositories/in-Memory/userRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUserUseCase';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUseUseCase';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';
import { UserRefreshTokenRepositoryInMemory } from '@modules/accounts/repositories/in-Memory/userRefreshTokenRepositoryInMemory';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRespositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsProvider;
let userTokenRepositoryInMemory: UserRefreshTokenRepositoryInMemory;

describe('Authenticate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRespositoryInMemory();
        dateProvider = new DayjsProvider();
        userTokenRepositoryInMemory = new UserRefreshTokenRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
            dateProvider,
            userTokenRepositoryInMemory,
        );

        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it('Should be able to Authenticate an  User', async () => {
        const user: ICreateUserDTO = {
            driver_license: '63646376',
            email: 'user@testes.com',
            password: '1234',
            name: 'user teste',
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('Should not be able to authenticate an nonexistent user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '63646370',
            email: 'nonexistent@email.com',
            password: '1234',
            name: 'user teste',
        };

        await createUserUseCase.execute(user);

        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'user_nonexistent@email.com',
                password: '1234',
            });
        }).rejects.toEqual(new AppError('Email  or password incorrect!'));
    });

    it('Should not be able to authenticate with incorrect password', async () => {
        const user: ICreateUserDTO = {
            name: 'myUser teste',
            email: 'myUser@email.com',
            driver_license: '12445333',
            password: '1234',
        };
        await createUserUseCase.execute(user);
        await expect(async () => {
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectpassword',
            });
        }).rejects.toEqual(new AppError('Email  or password incorrect!'));
    });
});
