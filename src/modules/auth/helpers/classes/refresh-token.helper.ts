import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { UserRepository } from '~/repositories/user';
import type { BaseUser } from '~/shared/types';

@Injectable()
export class RefreshTokenHelper {
    constructor(private userRepository: UserRepository) {}

    async updateHashedRefreshTokenById(params: Pick<BaseUser, 'id'> & Pick<User, 'hashedRefreshToken'>) {
        const { hashedRefreshToken, id } = params;

        return this.userRepository.update({ where: { id }, data: { hashedRefreshToken } });
    }

    async deleteRefreshToken({ id }: Pick<BaseUser, 'id'>) {
        return this.userRepository.updateMany({
            where: {
                id,
                hashedRefreshToken: {
                    not: null,
                },
            },
            data: { hashedRefreshToken: null },
        });
    }
}
