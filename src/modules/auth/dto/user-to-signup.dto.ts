import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import type { IUserUserToSignupDto } from '~/modules/auth/types';
import { MESSAGES } from '~/shared/constants';
import { IsEqualTo } from '~/shared/decorators';

export class UserToSignupDto implements IUserUserToSignupDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: MESSAGES.weakPassword })
    password!: string;

    @IsNotEmpty()
    @IsString()
    @IsEqualTo<IUserUserToSignupDto>('password')
    confirmPassword!: string;

    @IsNotEmpty()
    @IsString()
    userName!: string;

    @IsNotEmpty()
    @IsString()
    displayName!: string;
}
