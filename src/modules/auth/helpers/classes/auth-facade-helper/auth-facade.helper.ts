import { Injectable } from '@nestjs/common';
import type { Prisma, User } from '@prisma/client';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { RefreshTokenHelper } from '~/modules/auth/helpers/classes/refresh-token-helper';
import type { BaseUser, BaseUserWith, JwtPayload, Tokens } from '~/shared/types';
import { UserRepositoryHelper } from '../user-repository.helper';

@Injectable()
export class AuthFacadeHelper {
    constructor(
        private userRepositoryHelper: UserRepositoryHelper,
        private bcryptHelper: BcryptHelper,
        private jwtHelper: JwtHelper,
        private refreshTokenHelper: RefreshTokenHelper
    ) {}

    async getHashedRefreshToken(
        params: Pick<Tokens, 'refreshToken'>
    ): Promise<NonNullable<User['hashedRefreshToken']>> {
        return this.bcryptHelper.getHashedRefreshToken(params);
    }

    async getTokens(params: JwtPayload): Promise<Tokens> {
        return this.jwtHelper.getTokens(params);
    }

    async updateHashedRefreshTokenById(
        params: Pick<BaseUser, 'id'> & Pick<User, 'hashedRefreshToken'>
    ): Promise<BaseUser> {
        return this.refreshTokenHelper.updateHashedRefreshTokenById(params);
    }

    async deleteRefreshTokenById(params: Pick<BaseUser, 'id'>): Promise<Prisma.BatchPayload> {
        return this.refreshTokenHelper.deleteRefreshTokenById(params);
    }

    async createUser(user: Omit<BaseUserWith<'password'>, 'id'>): Promise<BaseUser> {
        return this.userRepositoryHelper.createUser(user);
    }
}
