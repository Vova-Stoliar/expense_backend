import { AuthGuard } from '@nestjs/passport';

export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {
    override canActivate() {
        return true;
    }
}
