import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';
import { addDefaultSelectValues } from '~/shared/repositories/token/lib';

// implements Prisma.TokenDelegate<undefined>

@Injectable()
export class TokenRepository {
    constructor(private prismaService: PrismaService) {}

    create<T extends Prisma.TokenCreateArgs>(args: Prisma.SelectSubset<T, Prisma.TokenCreateArgs>) {
        const { select } = args;

        return this.prismaService.token.create({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    updateMany<T extends Prisma.TokenUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.TokenUpdateManyArgs>) {
        return this.prismaService.token.updateMany(args);
    }

    update<T extends Prisma.TokenUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.TokenUpdateArgs>) {
        const { select } = args;

        return this.prismaService.token.update({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    findUnique<T extends Prisma.TokenFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.TokenFindUniqueArgs>) {
        const { select } = args;

        return this.prismaService.token.findUnique({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }
}
