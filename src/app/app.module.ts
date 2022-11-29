import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '~/modules/auth';
import { TokenRepository } from '~/shared/repositories/token';
import { PrismaErrorsFilterProvider } from '~/app/filters';
import { AccessTokenGuard } from '~/app/guards';
import { CustomConfigModule, PrismaModule } from '~/shared/modules';
import { TokenStrategyProvider } from '~/app/strategies';

@Module({
    imports: [AuthModule, PrismaModule, CustomConfigModule],
    providers: [
        ...TokenStrategyProvider,
        ...PrismaErrorsFilterProvider,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
        TokenRepository,
    ],
})
export class AppModule {}
