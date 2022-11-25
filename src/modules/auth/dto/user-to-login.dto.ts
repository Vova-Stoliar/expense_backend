import { PickType } from '@nestjs/mapped-types';
import { UserToSignupDto } from '~/modules/auth/dto';
import type { IUserToLoginDto } from '~/modules/auth/types';
import type { BaseUser } from '~/shared/types';

export class UserToLoginDto extends PickType(UserToSignupDto, ['email', 'password']) implements IUserToLoginDto {
    id!: BaseUser['id'];
}
