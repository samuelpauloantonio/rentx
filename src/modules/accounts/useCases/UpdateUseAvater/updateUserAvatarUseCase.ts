import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
export class UpdateUserAvaterUseCase {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @inject('StorageProvider')
        private readonly StorageProvider: IStorageProvider,
    ) {}

    async execute({ avatar_file, user_id }: IRequest): Promise<void> {
        const userFinded = await this.userRepository.findById(user_id);

        if (userFinded.avatar) {
            await this.StorageProvider.delete(userFinded.avatar, 'avatar');

            await this.StorageProvider.save(avatar_file, 'avatar');
        }
        const user = {
            ...userFinded,
            avatar: avatar_file,
        };
        await this.userRepository.findByIdAndUpdate(user);
    }
}
