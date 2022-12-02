import { PickType } from '@nestjs/mapped-types';
import type { User } from '@prisma/client';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserToSignupDto } from '~/modules/auth/dto';

type IUserToResetPassword = Pick<User, 'password' | 'id' | 'email'> & {
    confirmPassword: User['password'];
};

export class UserToResetPasswordDto
    extends PickType(UserToSignupDto, ['email', 'password', 'confirmPassword'])
    implements IUserToResetPassword
{
    @IsUUID()
    @IsNotEmpty()
    id!: User['id'];
}
