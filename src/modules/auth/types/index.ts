import type { User } from '@prisma/client';

export interface IUserDto extends Pick<User, 'email' | 'userName' | 'displayName' | 'password'> {
    confirmPassword: User['password'];
}

export type IUserToLoginDto = Pick<User, 'email' | 'password' | 'id'>;

// TODO don't use id in payload instead use displayName
export type JwtPayload = Pick<User, 'id' | 'email'>;

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export type UserExistencePipeReturnValue = Promise<IUserToLoginDto & { encryptedPassword: User['password'] }>;
export type UserPasswordPipeValue = Awaited<UserExistencePipeReturnValue>;
