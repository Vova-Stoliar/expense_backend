import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '~/modules/auth';
import { PrismaExceptionsFilter } from '~/shared/exceptions';
import { AccessTokenGuard } from '~/shared/guards/access-token.guard';
import { CustomConfigModule } from '~/shared/modules/config';
import { PrismaModule } from '~/shared/modules/prisma';

@Module({
    imports: [AuthModule, PrismaModule, CustomConfigModule],
    providers: [
        {
            provide: APP_FILTER,
            useClass: PrismaExceptionsFilter,
        },
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
    ],
})
export class AppModule {}
