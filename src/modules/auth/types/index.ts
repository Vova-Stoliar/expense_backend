import type { User } from '@prisma/client';
import type { BaseUser } from '~/shared/types';

export * from './utility-type';

export interface IUserUserToSignupDto extends Omit<BaseUser, 'id'>, Pick<User, 'password'> {
    confirmPassword: User['password'];
}

export type IUserToLoginDto = Pick<BaseUser, 'email' | 'id'> & Pick<User, 'password'>;
