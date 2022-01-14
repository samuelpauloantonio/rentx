import { instanceToInstance } from 'class-transformer';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { UsersEntites } from '../infra/typeorm/entities/Users';

export class UserMap {
    static toDTO({
        avatar,
        driver_license,
        email,
        name,
        id,
        avatar_url,
    }: UsersEntites): UserResponseDTO {
        const user = instanceToInstance({
            id,
            avatar,
            avatar_url,
            driver_license,
            email,
            name,
        });
        return user;
    }
}
