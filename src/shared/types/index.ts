import type { User } from '@prisma/client';

export * from './utility-types';

export type BaseUser = Pick<User, 'email' | 'userName' | 'displayName' | 'id'>;

export type BaseUserWith<K extends keyof User> = BaseUser & Pick<User, K>;

export interface DateTime {
    createdAt: string;
    updatedAt: string;
}

export type JwtPayload = Pick<User, 'id' | 'email'> & Pick<DateTime, 'createdAt'>;

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
