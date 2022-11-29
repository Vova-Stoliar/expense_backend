import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaErrorsFilterProvider } from '~/app/filters';
import { AccessTokenGuard, PoliciesGuard } from '~/app/guards';
import { CaslModule } from '~/app/modules';
import { TokenStrategyProvider } from '~/app/strategies';
import { AuthModule } from '~/modules/auth';
import { CustomConfigModule, PrismaModule } from '~/shared/modules';
import { TokenRepository } from '~/shared/repositories/token';

@Module({
    imports: [AuthModule, PrismaModule, CustomConfigModule, CaslModule],
    providers: [
        ...TokenStrategyProvider,
        ...PrismaErrorsFilterProvider,
        {
            provide: APP_GUARD,
            useClass: AccessTokenGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PoliciesGuard,
        },
        TokenRepository,
    ],
})
export class AppModule {}
