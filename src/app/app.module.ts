import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '~/modules/auth';
import { TokenRepository } from '~/shared/repositories/token';
import { PrismaErrorsFilterProvider } from '~/shared/filters';
import { AccessTokenGuard } from '~/shared/guards';
import { CustomConfigModule, PrismaModule } from '~/shared/modules';
import { TokenStrategyProvider } from '~/shared/strategies';

// TODO move strategies to AppModule

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
