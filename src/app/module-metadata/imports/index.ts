import type { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { CaslModule } from '~/app/modules';
import { AuthModule } from '~/modules/auth';
import { CustomConfigModule, PrismaModule } from '~/shared/modules';

export const Imports: ModuleMetadata['imports'] = [AuthModule, PrismaModule, CustomConfigModule, CaslModule];
