import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { normalizeUser } from '~/modules/auth/lib';
import { CustomConfigService } from '~/shared/modules/config';
import { UserRepository } from '~/shared/repositories/user';
import type { BaseUser } from '~/shared/types';

@Injectable()
export class BcryptHelper {
    constructor(private customConfigService: CustomConfigService, private userRepository: UserRepository) {}

    async getHashedPassword({ password }: Pick<User, 'password'>): Promise<User['password']> {
        return await hash(password, this.customConfigService.BCRYPT_SALT_ROUNDS);
    }

    async validateUserPassword(params: Pick<User, 'email' | 'password'>): Promise<BaseUser> {
        const user = await this.userRepository.findUniqueOrThrow({
            where: { email: params.email },
            select: { password: true },
        });

        const isPasswordValid = await compare(params.password, user.password);

        if (!isPasswordValid) throw new UnauthorizedException();

        return normalizeUser(user);
    }
}
