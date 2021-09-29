import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from '../dtos/IcreateUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

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
            throw new Error('User already exists !');

        const PasswordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            password: PasswordHash,
            email,
            driver_license,
        });
    }
}
