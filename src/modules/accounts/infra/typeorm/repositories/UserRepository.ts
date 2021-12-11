import { EntityRepository, getRepository, Repository } from 'typeorm';

import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/IcreateUserDTO';
import { UsersEntites } from '@modules/accounts/infra/typeorm/entities/Users';

@EntityRepository(UsersEntites)
export class UserRepository implements IUserRepository {
    private repository: Repository<UsersEntites>;

    constructor() {
        this.repository = getRepository(UsersEntites);
    }

    async create({
        name,
        email,
        password,
        driver_license,
        avatar,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<UsersEntites> {
        const user = await this.repository.findOne({ email });

        return user;
    }

    async findById(id: string): Promise<UsersEntites> {
        const user = await this.repository.findOne({ id });

        return user;
    }

    async findByIdAndUpdate(user: ICreateUserDTO): Promise<UsersEntites> {
        const userUpdated = await this.repository.save({
            ...user,
        });

        return userUpdated;
    }
}
