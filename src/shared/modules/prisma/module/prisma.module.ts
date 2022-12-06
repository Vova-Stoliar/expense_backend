import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CustomConfigModule } from '~/shared/modules/config';

@Global()
@Module({
    imports: [CustomConfigModule],
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
