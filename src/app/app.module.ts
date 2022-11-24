import { Module } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '~/modules/auth';
import { AccessTokenStrategy } from '~/modules/auth/strategy';
import { PrismaErrorsFilterProvider } from '~/shared/filters';
// TODO: fix imports
import { CustomConfigModule } from '~/shared/modules/config';
import { PrismaModule } from '~/shared/modules/prisma';

@Module({
    imports: [AuthModule, PrismaModule, CustomConfigModule],
    providers: [
        AccessTokenStrategy,
        ...PrismaErrorsFilterProvider,
        // {
        //     provide: APP_GUARD,
        //     useClass: AccessTokenGuard,
        // },
    ],
})
export class AppModule {}
