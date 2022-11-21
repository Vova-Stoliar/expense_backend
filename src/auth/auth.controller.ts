import * as NestCommon from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserToCreateDto } from '~/auth/dto';

// TODO rename UserToCreateDto to UserToSignUp

@NestCommon.Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @NestCommon.Post('local/signUp')
    signUpLocal(@NestCommon.Body() userToCreate: UserToCreateDto) {
        return this.authService.signUpLocal(userToCreate);
    }

    @NestCommon.Post('local/signIn')
    signInLocal() {
        return this.authService.signInLocal();
    }

    @NestCommon.Post('logout')
    logout() {
        return this.authService.logout();
    }

    @NestCommon.Post('refresh')
    refreshTokens() {
        return this.authService.refreshTokens();
    }
}
