import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UserToSignupDto } from '~/modules/auth/dto';
import type { IUserToResetPassword } from '~/modules/auth/types';
import type { BaseUser } from '~/shared/types';

export class UserToResetPasswordDto
    extends PickType(UserToSignupDto, ['email', 'password', 'confirmPassword'])
    implements IUserToResetPassword
{
    @IsUUID()
    @IsNotEmpty()
    id!: BaseUser['id'];
}
