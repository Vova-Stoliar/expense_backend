import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HelpersProvider } from '~/modules/auth/helpers';
import { AuthController } from '~/modules/auth/module/auth-controller';
import { AuthService } from './auth-service';
import { UserRepository } from '~/repositories/user';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, ...HelpersProvider],
})
export class AuthModule {}
