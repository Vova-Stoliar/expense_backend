import { PickType } from '@nestjs/mapped-types';
import type { User } from '@prisma/client';
import { UserDto } from '~/modules/auth/dto';
import type { IUserToLoginDto } from '~/modules/auth/types';

export class UserToLoginDto extends PickType(UserDto, ['email', 'password']) implements IUserToLoginDto {
    id!: User['id'];
}
