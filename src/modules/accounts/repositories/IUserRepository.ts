import { UsersEntites } from '@modules/accounts/entities/Users';
import { ICreateUserDTO } from '@modules/accounts/dtos/IcreateUserDTO';

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<UsersEntites>;
    findById(id: string): Promise<UsersEntites>;
    findByIdAndUpdate(user: ICreateUserDTO): Promise<UsersEntites>;
}
