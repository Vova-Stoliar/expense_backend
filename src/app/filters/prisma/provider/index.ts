import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { APP_FILTER } from '@nestjs/core';
import { ClientKnownRequestErrorFilter, PrismaNotFoundErrorFilter } from '~/app/filters/prisma/filters';

export const PrismaErrorsFilterProvider: Provider[] = [
    {
        provide: APP_FILTER,
        useClass: ClientKnownRequestErrorFilter,
    },
    {
        provide: APP_FILTER,
        useClass: PrismaNotFoundErrorFilter,
    },
];
