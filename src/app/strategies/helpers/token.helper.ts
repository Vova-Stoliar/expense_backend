import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { User } from '@prisma/client';
import { UserRepository } from '~/shared/repositories/user';
import type { JwtPayload } from '~/shared/types';

@Injectable()
export class TokenHelper {
    constructor(private userRepository: UserRepository) {}

    async validateTokenByUser(payload: JwtPayload): Promise<Omit<User, 'updatedAt' | 'createdAt'>> {
        const { id, createdAt } = payload;

        const user = await this.userRepository.findUnique({
            where: { id },
            select: { refreshTokenUpdatedAt: true, isAdmin: true, password: true, categories: true },
        });

        if (createdAt !== user?.refreshTokenUpdatedAt?.toISOString()) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
