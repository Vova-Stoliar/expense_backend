import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { UserRepository } from '~/repositories/user';
import type { BaseUser, BaseUserWith } from '~/shared/types';

@Injectable()
export class RefreshTokenHelper {
    constructor(private userRepository: UserRepository) {}

    async updateHashedRefreshTokenById(
        params: Pick<BaseUserWith<'hashedRefreshToken'>, 'id' | 'hashedRefreshToken'>
    ): Promise<BaseUser> {
        const { hashedRefreshToken, id } = params;

        return this.userRepository.update({ where: { id }, data: { hashedRefreshToken } });
    }

    async deleteRefreshTokenById({ id }: Pick<BaseUser, 'id'>): Promise<Prisma.BatchPayload> {
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
