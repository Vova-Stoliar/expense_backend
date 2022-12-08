import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import type { EnvironmentVariables } from '~/shared/modules/config/types';
import { CustomConfigService } from './custom-config.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object<EnvironmentVariables, true>({
                NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
                DATABASE_URL: Joi.string().required(),
                BCRYPT_SALT_ROUNDS: Joi.number().default(10),
                ACCESS_TOKEN_SECRET: Joi.string().required(),
                REFRESH_TOKEN_SECRET: Joi.string().required(),
            }),
        }),
    ],
    providers: [CustomConfigService],
    exports: [CustomConfigService],
})
export class CustomConfigModule {}
