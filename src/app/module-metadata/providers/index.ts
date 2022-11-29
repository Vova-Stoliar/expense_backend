import type { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { PrismaErrorsFilterProvider } from '~/app/filters';
import { AppGuardsProvider } from '~/app/guards';
import { TokenStrategyProvider } from '~/app/strategies';
import { TokenRepository } from '~/shared/repositories/token';

export const Providers: ModuleMetadata['providers'] = [
    ...TokenStrategyProvider,
    ...PrismaErrorsFilterProvider,
    ...AppGuardsProvider,
    TokenRepository,
];
