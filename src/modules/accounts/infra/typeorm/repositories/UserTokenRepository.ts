import { IUserTokenDTO } from '@modules/accounts/dtos/IUserTokenDTO';
import { IUserTokenRepository } from '@modules/cars/repositories/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

export class UserRefreshRepository implements IUserTokenRepository {
    private userTokenRepository: Repository<UserToken>;

    constructor() {
        this.userTokenRepository = getRepository(UserToken);
    }

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: IUserTokenDTO): Promise<UserToken> {
        const token = this.userTokenRepository.create({
            expires_date,
            user_id,
            refresh_token,
        });

        await this.userTokenRepository.save(token);

        return token;
    }

    async findOneByUserAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken> {
        const refreshToken = await this.userTokenRepository.findOne({
            user_id,
            refresh_token,
        });

        return refreshToken;
    }

    async deleteRefreshToken(id: string): Promise<void> {
        await this.userTokenRepository.delete(id);
    }
}
