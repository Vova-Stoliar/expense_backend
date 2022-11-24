import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from '~/modules/auth/strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '~/repositories/user';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, RefreshTokenStrategy],
})
export class AuthModule {}
