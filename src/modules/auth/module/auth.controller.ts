import * as NestCommon from '@nestjs/common';
import type { User } from '@prisma/client';
import type { Response } from 'express';
import { RESPONSE_HEADERS } from '~/modules/auth/constants';
import { UserDto, UserToLoginDto } from '~/modules/auth/dto';
import { ValidateUserExistencePipe, ValidateUserPasswordPipe } from '~/modules/auth/pipes';
import type { Tokens } from '~/modules/auth/types';
import { GetCurrentUser } from '~/shared/decorators/get-current-user.decorator';
import { RefreshTokenGuard } from '~/shared/guards';
import { AuthService } from './auth.service';

// TODO refactor "Bearer"

@NestCommon.Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @NestCommon.Post('signup')
    async signup(@NestCommon.Body() userToSignUp: UserDto, @NestCommon.Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken, user } = await this.authService.signup(userToSignUp);

        res.setHeader(RESPONSE_HEADERS.authorization, `Bearer ${accessToken}`);

        return { user, token: refreshToken };
    }

    @NestCommon.Post('login')
    @NestCommon.UsePipes(ValidateUserExistencePipe, ValidateUserPasswordPipe)
    async login(@NestCommon.Body() userToLogin: UserToLoginDto, @NestCommon.Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await this.authService.login(userToLogin);

        res.setHeader(RESPONSE_HEADERS.authorization, `Bearer ${accessToken}`);

        return { user: userToLogin, token: refreshToken };
    }

    @NestCommon.Get('logout')
    @NestCommon.HttpCode(NestCommon.HttpStatus.NO_CONTENT)
    async logout(@GetCurrentUser('id') id: User['id'], @NestCommon.Res({ passthrough: true }) res: Response) {
        res.removeHeader(RESPONSE_HEADERS.authorization);

        await this.authService.logout({ id });
    }

    @NestCommon.UseGuards(RefreshTokenGuard)
    @NestCommon.Get('refresh')
    async refresh(
        @GetCurrentUser('id') id: User['id'],
        @GetCurrentUser('refreshToken') refreshToken: Tokens['refreshToken'],
        @NestCommon.Res({ passthrough: true }) res: Response
    ) {
        const { accessToken, refreshToken: generatedRefreshToken } = await this.authService.refresh({
            id,
            refreshToken,
        });

        res.setHeader(RESPONSE_HEADERS.authorization, `Bearer ${accessToken}`);

        return { token: generatedRefreshToken };
    }
}
