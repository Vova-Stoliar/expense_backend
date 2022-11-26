import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { CustomConfigService } from '~/shared/modules';
import type { BaseUser, Tokens } from '~/shared/types';

@Injectable()
export class BcryptHelper {
    constructor(private customConfigService: CustomConfigService) {}

    async getHashedRefreshToken({
        refreshToken,
    }: Pick<Tokens, 'refreshToken'>): Promise<NonNullable<User['hashedRefreshToken']>> {
        return await hash(refreshToken, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    async getHashedPassword({ password }: Pick<User, 'password'>): Promise<NonNullable<BaseUser['userName']>> {
        return await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }
}
