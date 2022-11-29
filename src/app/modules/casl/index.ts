import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './module/casl-ability.factory';

@Module({
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule {}
