import { ICreateUserDTO } from '../dtos/IcreateUserDTO';

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
}
