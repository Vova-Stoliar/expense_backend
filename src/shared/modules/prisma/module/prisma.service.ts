import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomConfigService } from '~/shared/modules/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(configService: CustomConfigService) {
        super({
            datasources: {
                db: {
                    url: configService.DATABASE_URL,
                },
            },
        });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }

    async onModuleDestroy(): Promise<void> {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    // TODO refactor
    async cleanDatabase() {
        if (process.env['NODE_ENV'] === 'production') return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Promise.all(models.map((modelKey) => this[modelKey].deleteMany()));
    }
}
