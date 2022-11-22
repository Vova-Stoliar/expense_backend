import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigService } from './custom-config.service';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [CustomConfigService],
    exports: [CustomConfigService],
})
export class CustomConfigModule {}
