import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '~/repositories/user';

@Module({
    controllers: [AuthController],
    providers: [AuthService, UserRepository],
})
export class AuthModule {}
