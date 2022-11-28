import * as NestCommon from '@nestjs/common';
import { UserToLoginDto, UserToSignupDto } from '~/modules/auth/dto';
import { UserToResetPasswordDto } from '~/modules/auth/dto/user-to-reset-password.dto';
import { RefreshTokenGuard } from '~/modules/auth/guards';
import { AuthService } from '~/modules/auth/module/auth-service';
import * as Pipes from '~/modules/auth/pipes';
import type { IUserToResetPassword } from '~/modules/auth/types';
import { GetUserPropertyByKey, Public } from '~/shared/decorators';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';

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
    async login(
        @NestCommon.Body(Pipes.ValidateUserExistence, Pipes.ValidateUserPassword) userToLogin: UserToLoginDto
    ): Promise<{ user: Pick<BaseUser, 'email' | 'id'> } & Tokens> {
        const { id, email } = userToLogin;
        const tokens = await this.authService.login(userToLogin);

        return { user: { id, email }, ...tokens };
    }

    @NestCommon.Get('logout')
    @NestCommon.HttpCode(NestCommon.HttpStatus.NO_CONTENT)
    async logout(@GetUserPropertyByKey('id') id: BaseUser['id']): Promise<void> {
        await this.authService.logout({ id });
    }

    @NestCommon.Post('resetPassword')
    @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
    async resetPassword(
        // @NestCommon.Body('id', Pipes.ValidateUserExistenceByField) _id: IUserToResetPassword['id'],
        @NestCommon.Body() user: UserToResetPasswordDto
    ): Promise<{ user: BaseUser } & Tokens> {
        return this.authService.resetPassword(user);
    }
    // TODO create @GetUser

    @NestCommon.UseGuards(RefreshTokenGuard)
    @NestCommon.Get('refresh')
    async refresh(@GetUserPropertyByKey('id') user: BaseUser): Promise<Tokens> {
        return this.authService.refresh(user);
    }

    @NestCommon.Get('check')
    check() {
        return 'I am check';
    }
}
