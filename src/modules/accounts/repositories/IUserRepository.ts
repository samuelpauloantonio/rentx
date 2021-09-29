import { ICreateUserDTO } from '../dtos/IcreateUserDTO';

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<ICreateUserDTO>;
    findById(id): Promise<ICreateUserDTO>;
}
