import type { User } from '@prisma/client';

export interface IUserDto extends Pick<User, 'email' | 'userName' | 'displayName' | 'password'> {
    confirmPassword: User['password'];
}

export type JwtPayload = Pick<User, 'id' | 'email'>;
