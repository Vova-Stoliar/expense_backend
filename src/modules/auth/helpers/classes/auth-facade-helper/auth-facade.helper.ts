import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { BcryptHelper } from '~/modules/auth/helpers/classes/bcrypt-helper';
import { DefaultRepositoryHelper } from '~/modules/auth/helpers/classes/default-repository-helper';
import { JwtHelper } from '~/modules/auth/helpers/classes/jwt-helper';
import { UserRepository } from '~/shared/repositories/user';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

@Injectable()
export class AuthFacadeHelper {
    constructor(
        private bcryptHelper: BcryptHelper,
        private jwtHelper: JwtHelper,
        private userRepository: UserRepository,
        private defaultRepositoryHelper: DefaultRepositoryHelper
    ) {}

    async getTokens(
        params: Pick<User, 'id' | 'email'>
    ): Promise<Tokens & { createdAt: User['refreshTokenUpdatedAt'] }> {
        return this.jwtHelper.getTokens(params);
    }

    async createUser(params: Omit<BaseUserWith<'password'>, 'id'>): Promise<BaseUser> {
        const { displayName, userName, email, password } = params;

        const hashedPassword = await this.bcryptHelper.getHashedPassword({ password });

        const categories = await this.defaultRepositoryHelper.getCategories();

        return this.userRepository.create({
            data: {
                password: hashedPassword,
                email,
                userName,
                displayName,
                categories,
            },
        });
    }

    async getHashedPassword({ password }: Pick<User, 'password'>): Promise<User['password']> {
        return this.bcryptHelper.getHashedPassword({ password });
    }

    async updateUser(
        params: PartialPick<User, 'password' | 'refreshTokenUpdatedAt'> & Pick<User, 'id'>
    ): Promise<BaseUser> {
        const { id, password, refreshTokenUpdatedAt } = params;

        return this.userRepository.update({ where: { id }, data: { password, refreshTokenUpdatedAt } });
    }

    async validateUserPassword(params: Pick<User, 'email' | 'password'>): Promise<BaseUser> {
        return this.bcryptHelper.validateUserPassword(params);
    }
}
