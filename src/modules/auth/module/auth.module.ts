import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HelpersProvider } from '~/modules/auth/helpers';
import { UserRepository } from '~/repositories/user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, UserRepository, ...HelpersProvider],
})
export class AuthModule {}
