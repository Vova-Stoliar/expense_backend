import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '~/modules/auth';
// import { CustomConfigModule } from '~/shared/modules/config';
import { PrismaModule } from '~/shared/modules/prisma';

@Module({
    imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
