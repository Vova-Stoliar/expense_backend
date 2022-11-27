import type { User } from '@prisma/client';
import type { BaseUserWith } from '~/shared/types';

export * from './utility-type';

export interface IUserUserToSignup extends Omit<BaseUserWith<'password'>, 'id'> {
    confirmPassword: User['password'];
}

export type IUserToLogin = Pick<User, 'password' | 'id' | 'email'>;

export type IUserToResetPassword = Pick<User, 'password' | 'id' | 'email'> & {
    confirmPassword: User['password'];
};
