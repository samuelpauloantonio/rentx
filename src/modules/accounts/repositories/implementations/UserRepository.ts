import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ICreateUserDTO } from '../../dtos/IcreateUserDTO';
import { UsersEntites } from '../../entities/Users';
import { IUserRepository } from '../IUserRepository';

@EntityRepository(UsersEntites)
export class UserRepository implements IUserRepository {
    private repository: Repository<UsersEntites>;

    constructor() {
        this.repository = getRepository(UsersEntites);
    }

    async create({
        name,
        email,
        username,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            username,
            password,
            driver_license,
        });

        await this.repository.save(user);
    }
}
