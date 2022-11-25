import type { User } from '@prisma/client';
import type { BcryptHelper, JwtHelper, RefreshTokenHelper, UserRepositoryHelper } from '~/modules/auth/helpers';
import type { BaseUser, BaseUserWith, JwtPayload, Tokens } from '~/shared/types';

export class AuthFacadeHelper {
    constructor(
        private userRepositoryHelper: UserRepositoryHelper,
        private bcryptHelper: BcryptHelper,
        private jwtHelper: JwtHelper,
        private refreshTokenHelper: RefreshTokenHelper
    ) {}

    async getHashedRefreshToken(params: Pick<Tokens, 'refreshToken'>) {
        return this.bcryptHelper.getHashedRefreshToken(params);
    }

    async getHashedPassword(params: Pick<User, 'password'>) {
        return this.bcryptHelper.getHashedPassword(params);
    }

    async getTokens(params: JwtPayload): Promise<Tokens> {
        return this.jwtHelper.getTokens(params);
    }

    async updateHashedRefreshTokenById(params: Pick<BaseUser, 'id'> & Pick<User, 'hashedRefreshToken'>) {
        return this.refreshTokenHelper.updateHashedRefreshTokenById(params);
    }

    async deleteRefreshToken(params: Pick<BaseUser, 'id'>) {
        return this.refreshTokenHelper.deleteRefreshToken(params);
    }

    async createUser(user: Omit<BaseUserWith<'password'>, 'id'>) {
        return this.userRepositoryHelper.createUser(user);
    }
}
