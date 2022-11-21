import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import type { UserToCreate } from '~/auth/types';

// TODO: validate password to be strong
// TODO: validate confirm password

export class UserToCreateDto implements UserToCreate {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword!: string;

    @IsNotEmpty()
    @IsString()
    userName!: string;

    @IsNotEmpty()
    @IsString()
    displayName!: string;
}
