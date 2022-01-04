import { IUserTokenRepository } from '@modules/accounts/repositories/IUserTokenRepository';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';
import { IUserTokenDTO } from '@modules/accounts/dtos/IUserTokenDTO';

export class UserRefreshTokenRepositoryInMemory
    implements IUserTokenRepository
{
    userTokens: UserToken[] = [];

    async create({
        expires_date,
        user_id,
        refresh_token,
    }: IUserTokenDTO): Promise<UserToken> {
        const token = new UserToken();
        Object.assign(token, {
            expires_date,
            user_id,
            refresh_token,
        });

        this.userTokens.push(token);

        return token;
    }

    async deleteRefreshToken(id: string): Promise<void> {
        const index = this.userTokens.findIndex(token => token.id === id);
        this.userTokens.slice(index);
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        return this.userTokens.find(
            token => token.refresh_token === refresh_token,
        );
    }

    async findOneByUserAndRefreshToken(
        user_id: string,
        refresh_token: string,
    ): Promise<UserToken> {
        return this.userTokens.find(
            user =>
                user.user_id === user_id &&
                user.refresh_token === refresh_token,
        );
    }
}
