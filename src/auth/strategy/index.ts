import type { User } from '@prisma/client';

export interface UserToCreate extends Pick<User, 'email' | 'userName' | 'displayName' | 'password'> {
    confirmPassword: User['password'];
}
