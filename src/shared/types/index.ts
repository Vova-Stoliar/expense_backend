import type { InferSubjects, MongoAbility } from '@casl/ability';
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

interface CaslUser extends User {
    kind: 'User';
}

export type Subjects = InferSubjects<CaslUser>;
export type AppAbility = MongoAbility<[Action, Subjects]>;
export type PolicyHandler = (ability: AppAbility) => boolean;

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export interface Category {
    id: string;
    notes: string;
    amount: number;
    updatedAt: string;
    createdAt: string;
}
