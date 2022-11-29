import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from '~/app/modules/casl/module/casl-ability.factory';

@Global()
@Module({
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule {}
