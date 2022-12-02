import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { EnvironmentVariables } from '../types';

@Injectable()
export class CustomConfigService extends ConfigService<EnvironmentVariables, true> {
    readonly DATABASE_URL: EnvironmentVariables['DATABASE_URL'];
    readonly BCRYPT_SALT_ROUNDS: EnvironmentVariables['BCRYPT_SALT_ROUNDS'];
    readonly ACCESS_TOKEN_SECRET: EnvironmentVariables['ACCESS_TOKEN_SECRET'];
    readonly REFRESH_TOKEN_SECRET: EnvironmentVariables['REFRESH_TOKEN_SECRET'];
    readonly NODE_ENV: EnvironmentVariables['NODE_ENV'];

    constructor() {
        super();

        this.DATABASE_URL = this.get('DATABASE_URL', { infer: true });
        this.BCRYPT_SALT_ROUNDS = Number(this.get('BCRYPT_SALT_ROUNDS', { infer: true }));
        this.ACCESS_TOKEN_SECRET = this.get('ACCESS_TOKEN_SECRET', { infer: true });
        this.REFRESH_TOKEN_SECRET = this.get('REFRESH_TOKEN_SECRET', { infer: true });
        this.NODE_ENV = this.get('NODE_ENV', { infer: true });
    }
}
