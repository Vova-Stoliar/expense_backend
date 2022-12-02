import type { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { PrismaErrorsFilterProvider } from '~/app/filters';
import { AppGuardsProvider } from '~/app/guards';
import { TokenStrategyProvider } from '~/app/strategies';

export const Providers: ModuleMetadata['providers'] = [
    ...TokenStrategyProvider,
    ...PrismaErrorsFilterProvider,
    ...AppGuardsProvider,
];
