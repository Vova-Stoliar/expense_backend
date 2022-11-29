import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HelpersProvider } from '~/modules/auth/helpers';
import { AuthController } from '~/modules/auth/module/auth-controller';
import { TokenRepository } from '~/shared/repositories/token';
import { UserRepository } from '~/shared/repositories/user';
import { AuthService } from './auth-service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, TokenRepository, ...HelpersProvider],
})
export class AuthModule {}
