import type { CategoryTransaction, User } from '@prisma/client';

export * from './utility.types';
export * from './casl.types';

export type BaseUser = Pick<User, 'email' | 'userName' | 'displayName' | 'id'>;

export type BaseUserWith<K extends keyof User> = BaseUser & Pick<User, K>;

export type BaseCategoryTransaction = Pick<CategoryTransaction, 'id' | 'amount' | 'notes' | 'updatedAt' | 'createdAt'>;

export interface DateTime {
    createdAt: string;
    updatedAt: string;
}

export type JwtPayload = Pick<User, 'id' | 'email'> & Pick<DateTime, 'createdAt'>;

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface Category {
    name: string;
    id: string;
    notes: string;
    amount: number;
    updatedAt: string;
    createdAt: string;
}
