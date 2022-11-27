import type { BaseUserWith } from '~/shared/types';

export * from './utility-type';

export interface IUserUserToSignupDto extends Omit<BaseUserWith<'password'>, 'id'> {
    confirmPassword: BaseUserWith<'password'>['password'];
}

export type IUserToLoginDto = Pick<BaseUserWith<'password'>, 'password' | 'id' | 'email'>;
