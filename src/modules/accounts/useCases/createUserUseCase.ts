import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { AppError } from '@erros/AppError';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/IcreateUserDTO';

@injectable()
export class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        if (await this.userRepository.findByEmail(email))
            throw new AppError('User already exists !');

        const PasswordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            password: PasswordHash,
            email,
            driver_license,
        });
    }
}
