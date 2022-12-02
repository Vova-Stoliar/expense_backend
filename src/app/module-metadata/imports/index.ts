import type { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { CaslModule } from '~/app/modules';
import { AuthModule } from '~/modules/auth';
import { CategoryModule } from '~/modules/category';
import { TransactionModule } from '~/modules/transaction';
import { CustomConfigModule } from '~/shared/modules/config';
import { PrismaModule } from '~/shared/modules/prisma';

export const Imports: ModuleMetadata['imports'] = [
    AuthModule,
    PrismaModule,
    CategoryModule,
    CustomConfigModule,
    CaslModule,
    TransactionModule,
];
