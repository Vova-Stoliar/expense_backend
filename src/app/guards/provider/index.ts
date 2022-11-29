import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard, PoliciesGuard } from '~/app/guards/classes';

export const AppGuardsProvider: Provider[] = [
    {
        provide: APP_GUARD,
        useClass: AccessTokenGuard,
    },
    {
        provide: APP_GUARD,
        useClass: PoliciesGuard,
    },
];
