import { Injectable } from '@nestjs/common';
import type { Prisma, Token, User } from '@prisma/client';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { TokenRepository } from '~/shared/repositories/token';
import { UserRepository } from '~/shared/repositories/user';
import type { BaseUser, BaseUserWith, DateTime, Tokens } from '~/shared/types';

@Injectable()
export class AuthFacadeHelper {
    constructor(
        private bcryptHelper: BcryptHelper,
        private jwtHelper: JwtHelper,
        private tokenRepository: TokenRepository,
        private userRepository: UserRepository
    ) {}

    async getHashedRefreshToken(
        params: Pick<Tokens, 'refreshToken'>
    ): Promise<NonNullable<Token['hashedRefreshToken']>> {
        return this.bcryptHelper.getHashedRefreshToken(params);
    }

    async getTokens(params: Pick<User, 'id' | 'email'>): Promise<Tokens & Pick<DateTime, 'createdAt'>> {
        return this.jwtHelper.getTokens(params);
    }

    async updateHashedRefreshToken(
        params: Pick<Token, 'userId' | 'hashedRefreshToken'> & Pick<DateTime, 'updatedAt'>
    ): Promise<Pick<Token, 'userId'>> {
        const { hashedRefreshToken, updatedAt, userId } = params;

        return this.tokenRepository.update({
            data: { hashedRefreshToken, updatedAt },
            where: { userId },
        });
    }

    async deleteRefreshToken(params: Pick<User, 'id'>): Promise<Prisma.BatchPayload> {
        const { id } = params;

        return this.tokenRepository.updateMany({
            where: { hashedRefreshToken: { not: null }, userId: id },
            data: { hashedRefreshToken: null },
        });
    }

    async createUser(params: Omit<BaseUserWith<'password'>, 'id'>): Promise<BaseUser> {
        const { displayName, userName, email, password } = params;

        const hashedPassword = await this.bcryptHelper.getHashedPassword({ password });

        return this.userRepository.create({
            data: {
                password: hashedPassword,
                email,
                userName,
                displayName,
            },
        });
    }

    async createRefreshToken(
        params: Pick<Token, 'userId' | 'hashedRefreshToken'> & Pick<DateTime, 'updatedAt'>
    ): Promise<Pick<Token, 'userId'>> {
        const { hashedRefreshToken, userId, updatedAt } = params;

        return this.tokenRepository.create({ data: { hashedRefreshToken, userId, updatedAt } });
    }

    async validateUserPassword(params: Pick<User, 'email' | 'password'>): Promise<BaseUser> {
        return this.bcryptHelper.validateUserPassword(params);
    }

    async updatePassword(params: Pick<User, 'id' | 'password'>): Promise<BaseUser> {
        const { id, password } = params;

        const hashedPassword = await this.bcryptHelper.getHashedPassword({ password });

        return this.userRepository.update({ where: { id }, data: { password: hashedPassword } });
    }
}
