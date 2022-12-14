import { Module } from '@nestjs/common';
import { Imports, Providers } from '~/app/module-metadata';

@Module({
    imports: Imports,
    providers: Providers,
})
export class AppModule {}
