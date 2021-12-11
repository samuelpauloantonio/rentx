import { AppError } from '@shared/erros/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/IcreateUserDTO';
import { UserRespositoryInMemory } from '@modules/accounts/repositories/in-Memory/userRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUserUseCase';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUseUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRespositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRespositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory,
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

    it('Should not be able to authenticate an nonexistent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'myUser teste',
                email: 'myUser@email.com',
                driver_license: '12445333',
                password: '1234',
            };

            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectpassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
