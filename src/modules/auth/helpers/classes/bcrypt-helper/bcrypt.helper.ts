import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { hash } from 'bcrypt';
import type { BaseUser, Tokens } from '~/shared/types';
import { CustomConfigService } from '~/shared/modules';

@Injectable()
export class BcryptHelper {
    constructor(private customConfigService: CustomConfigService) {}

    async getHashedRefreshToken(
        params: Pick<Tokens, 'refreshToken'>
    ): Promise<NonNullable<User['hashedRefreshToken']>> {
        const { refreshToken } = params;

        return await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    async getHashedPassword({ password }: Pick<User, 'password'>): Promise<NonNullable<BaseUser['userName']>> {
        return await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }
}
