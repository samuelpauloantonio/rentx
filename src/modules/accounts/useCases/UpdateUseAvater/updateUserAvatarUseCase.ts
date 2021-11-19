import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../repositories/IUserRepository';
import { deteleFile } from '../../../../utils/file';

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

        if (userFinded.avatar) {
            await deteleFile(`./tmp/avatar/${userFinded.avatar}`);
        }
        const user = {
            ...userFinded,
            avatar: avatar_file,
        };
        await this.userRepository.findByIdAndUpdate(user);
    }
}
