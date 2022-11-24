import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import type { IUserDto } from '~/modules/auth/types';
import { MESSAGES } from '~/shared/constants';
import { IsEqualTo } from '~/shared/decorators';

// TODO rename user-to-sign-up
export class UserDto implements IUserDto {
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
    @IsEqualTo<IUserDto>('password')
    confirmPassword!: string;

    @IsNotEmpty()
    @IsString()
    userName!: string;

    @IsNotEmpty()
    @IsString()
    displayName!: string;
}
