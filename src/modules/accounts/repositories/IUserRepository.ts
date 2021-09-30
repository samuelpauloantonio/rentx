import { ICreateUserDTO } from '../dtos/IcreateUserDTO';
import { UsersEntites } from '../entities/Users';

export interface IUserRepository {
    create(data: UsersEntites): Promise<void>;
    findByEmail(email: string): Promise<UsersEntites>;
    findById(id: string): Promise<UsersEntites>;
    findByIdAndUpdate(user: ICreateUserDTO): Promise<UsersEntites>;
}
