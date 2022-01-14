import { UserResponseDTO } from '@modules/accounts/dtos/UserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { AppError } from '@shared/erros/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProfileUserUSeCase {
    constructor(
        @inject('UserRepository')
        private readonly UserRepository: IUserRepository,
    ) {}

    async execute(user_id: string): Promise<UserResponseDTO> {
        const user = await this.UserRepository.findById(user_id);

        if (!user) {
            throw new AppError('user not found', 404);
        }

        return UserMap.toDTO(user);
    }
}
