import type { User } from '@prisma/client';

export * from './utility-type';

// TODO: rename
export type BaseUser = Pick<User, 'email' | 'userName' | 'displayName' | 'id'>;

export type BaseUserWith<K extends keyof User> = BaseUser & Pick<User, K>;

export interface IUserDto extends Omit<BaseUser, 'id'>, Pick<User, 'password'> {
    confirmPassword: User['password'];
}

export type IUserToLoginDto = Pick<BaseUser, 'email' | 'id'> & Pick<User, 'password'>;

export type JwtPayload = Pick<BaseUser, 'id' | 'email'>;

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
