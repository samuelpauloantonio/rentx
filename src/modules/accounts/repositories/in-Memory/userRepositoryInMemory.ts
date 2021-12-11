import { ICreateUserDTO } from '@modules/accounts/dtos/IcreateUserDTO';
import { v4 as uuid } from 'uuid';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { UsersEntites } from '@modules/accounts/infra/typeorm/entities/Users';

export class UserRespositoryInMemory implements IUserRepository {
    User: UsersEntites[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new UsersEntites();

        Object.assign(user, {
            id: uuid(),
            name,
            email,
            password,
            driver_license,
        });

        this.User.push(user);
    }

    async findByEmail(email: string): Promise<UsersEntites> {
        return this.User.find(user => user.email === email);
    }

    async findById(id: string): Promise<UsersEntites> {
        return this.User.find(user => user.id === id);
    }

    async findByIdAndUpdate(user: ICreateUserDTO): Promise<UsersEntites> {
        const indexPosition = this.User.findIndex(data => data.id === user.id);

        this.User.forEach((el, index, arr) => {
            if (index === indexPosition) {
                const newContent: UsersEntites = {
                    ...el,
                    ...user,
                };
                arr.splice(indexPosition, 1, newContent);
            }
        });
        return this.User[indexPosition];
    }
}
