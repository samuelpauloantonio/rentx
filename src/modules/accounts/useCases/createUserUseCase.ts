import { inject, injectable } from 'tsyringe';
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
        await this.userRepository.create({
            name,
            password,
            email,
            driver_license,
        });
    }
}
