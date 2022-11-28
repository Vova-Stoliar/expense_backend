import type { User } from '@prisma/client';

export * from './utility-types';

export type BaseUser = Pick<User, 'email' | 'userName' | 'displayName' | 'id'>;

export type BaseUserWith<K extends keyof User> = BaseUser & Pick<User, K>;

export type JwtPayload = Pick<BaseUser, 'id' | 'email'> & { createdAt: string };

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
