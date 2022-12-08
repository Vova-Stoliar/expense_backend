import type { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { MESSAGES } from '~/shared/constants';
import { IsEqualTo } from '~/shared/decorators';
import type { BaseUserWith } from '~/shared/types';

interface IUserUserToSignup extends Omit<BaseUserWith<'password'>, 'id'> {
    confirmPassword: User['password'];
}

export class UserToSignupDto implements IUserUserToSignup {
    @IsNotEmpty()
    @IsEmail()
    email!: IUserUserToSignup['email'];

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: MESSAGES.weakPassword })
    password!: IUserUserToSignup['password'];

    @IsNotEmpty()
    @IsString()
    @IsEqualTo<IUserUserToSignup>('password')
    confirmPassword!: IUserUserToSignup['confirmPassword'];

    @IsNotEmpty()
    @IsString()
    userName!: IUserUserToSignup['userName'];

    @IsNotEmpty()
    @IsString()
    displayName!: IUserUserToSignup['displayName'];
}
