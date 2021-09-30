import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
export class UpdateUserAvaterUseCase {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository,
    ) {}

    async execute({ avatar_file, user_id }: IRequest): Promise<void> {
        const userFinded = await this.userRepository.findById(user_id);

        const user = {
            ...userFinded,
            avatar: avatar_file,
        };
        await this.userRepository.findByIdAndUpdate(user);
    }
}
