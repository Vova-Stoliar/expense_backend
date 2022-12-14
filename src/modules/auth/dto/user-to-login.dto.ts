import { PickType } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { UserToSignupDto } from '~/modules/auth/dto';

type IUserToLogin = Pick<User, 'password' | 'email'>;

export class UserToLoginDto extends PickType(UserToSignupDto, ['email', 'password']) implements IUserToLogin {}
