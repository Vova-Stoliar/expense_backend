import * as NestCommon from '@nestjs/common';
import { UserToLoginDto, UserToSignupDto } from '~/modules/auth/dto';
import { RefreshTokenGuard } from '~/modules/auth/guards';
import * as Pipes from '~/modules/auth/pipes';
import { GetUserPropertyByKey, Public } from '~/shared/decorators';
import type { BaseUser, BaseUserWith, Tokens } from '~/shared/types';
import { AuthService } from './auth.service';

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

    @NestCommon.UseGuards(RefreshTokenGuard)
    @NestCommon.Get('refresh')
    async refresh(
        @GetUserPropertyByKey('id', Pipes.ValidateUserExistenceByField) user: BaseUserWith<'hashedRefreshToken'>,
        @GetUserPropertyByKey('refreshToken', Pipes.ValidateTokenExistence) refreshToken: Tokens['refreshToken']
    ): Promise<Tokens> {
        return this.authService.refresh({
            user,
            refreshToken,
        });
    }
}
