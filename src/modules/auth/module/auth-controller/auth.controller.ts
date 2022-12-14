import * as NestCommon from '@nestjs/common';
import type { User } from '@prisma/client';
import { Login, Logout, Refresh, ResetPassword, Signup } from '~/modules/auth/decorators/controller';
import { UserToLoginDto, UserToResetPasswordDto, UserToSignupDto } from '~/modules/auth/dto';
import { AuthService } from '~/modules/auth/module/auth-service';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';
import type { BaseUser, Tokens } from '~/shared/types';

@NestCommon.Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Signup()
    async signup(@NestCommon.Body() userToSignUp: UserToSignupDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.signup(userToSignUp);
    }

    @Login()
    async login(@NestCommon.Body() userToLogin: UserToLoginDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.login(userToLogin);
    }

    @Logout()
    async logout(@GetUserFromReqPropertyByKey('id') id: User['id']): Promise<void> {
        await this.authService.logout({ id });
    }

    @ResetPassword()
    async resetPassword(@NestCommon.Body() user: UserToResetPasswordDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.resetPassword(user);
    }

    @Refresh()
    async refresh(@GetUserFromReq() user: Pick<User, 'email' | 'id'>): Promise<Tokens> {
        return this.authService.refresh(user);
    }
}
