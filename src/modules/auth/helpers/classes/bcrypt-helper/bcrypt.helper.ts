import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Token, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { normalizeUser } from '~/modules/auth/lib/normalize-user.lib';
import { CustomConfigService } from '~/shared/modules';
import { UserRepository } from '~/shared/repositories/user';
import type { BaseUser, Tokens } from '~/shared/types';

@Injectable()
export class BcryptHelper {
    constructor(private customConfigService: CustomConfigService, private userRepository: UserRepository) {}

    async getHashedRefreshToken(
        params: Pick<Tokens, 'refreshToken'>
    ): Promise<NonNullable<Token['hashedRefreshToken']>> {
        const { refreshToken } = params;

        return await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    async getHashedPassword({ password }: Pick<User, 'password'>): Promise<User['password']> {
        return await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    async validateUserPassword(params: Pick<User, 'email' | 'password'>): Promise<BaseUser> {
        const user = await this.userRepository.findUniqueOrThrow({
            where: { email: params.email },
            select: { password: true },
        });

        const isPasswordValid = await compare(params.password, user.password);

        if (!isPasswordValid) new UnauthorizedException();

        return normalizeUser(user);
    }
}
