import * as NestCommon from '@nestjs/common';
import type { User } from '@prisma/client';
import { UserToLoginDto, UserToResetPasswordDto, UserToSignupDto } from '~/modules/auth/dto';
import { RefreshTokenGuard } from '~/modules/auth/guards';
import { AuthService } from '~/modules/auth/module/auth-service';
import { GetUserFromReq, GetUserFromReqPropertyByKey, Public } from '~/shared/decorators';
import { CheckPolicies } from '~/shared/decorators/check-policies.decorator';
import type { AppAbility, BaseUser, Tokens } from '~/shared/types';
import { Action } from '~/shared/types';

@NestCommon.Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @NestCommon.Post('signup')
    async signup(@NestCommon.Body() userToSignUp: UserToSignupDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.signup(userToSignUp);
    }

    @Public()
    @NestCommon.Post('login')
    async login(@NestCommon.Body() userToLogin: UserToLoginDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.login(userToLogin);
    }

    @NestCommon.Get('logout')
    @NestCommon.HttpCode(NestCommon.HttpStatus.NO_CONTENT)
    async logout(@GetUserFromReqPropertyByKey('id') id: User['id']): Promise<void> {
        await this.authService.logout({ id });
    }

    @NestCommon.Post('resetPassword')
    @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
    async resetPassword(@NestCommon.Body() user: UserToResetPasswordDto): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.resetPassword(user);
    }

    @NestCommon.UseGuards(RefreshTokenGuard)
    @NestCommon.Get('refresh')
    async refresh(@GetUserFromReq() user: Pick<User, 'email' | 'id'>): Promise<Tokens> {
        return this.authService.refresh(user);
    }

    @NestCommon.Post('check')
    @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'User'))
    async check() {
        return 'I am check';
    }
}
