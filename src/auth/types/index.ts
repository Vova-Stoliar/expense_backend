import type { User } from '@prisma/client';

export interface UserToCreate extends Pick<User, 'email' | 'userName' | 'displayName' | 'password'> {
    confirmPassword: User['password'];
}

export interface Tokens {
    access_token: User['refreshToken'];
    refresh_token: User['refreshToken'];
}
