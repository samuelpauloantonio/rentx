import { IUserTokenDTO } from '@modules/accounts/dtos/IUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

export interface IUserTokenRepository {
    create({
        expires_date,
        user_id,
        refresh_token,
    }: IUserTokenDTO): Promise<UserToken>;

    findOneByUserAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken>;

    deleteRefreshToken(id: string): Promise<void>;

    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}
