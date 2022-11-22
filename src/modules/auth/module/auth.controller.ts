import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '~/modules/auth/dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signup(@Body() user: UserDto) {
        return this.authService.signup(user);
    }

    @Post('login')
    login() {
        return this.authService.login();
    }

    @Post('logout')
    logout() {
        return this.authService.logout();
    }
}
