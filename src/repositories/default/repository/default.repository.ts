import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';

// implements Prisma.DefaultDelegate<undefined>

@Injectable()
export class DefaultRepository {
    constructor(private prismaService: PrismaService) {}

    create<T extends Prisma.DefaultCreateArgs>(args: Prisma.SelectSubset<T, Prisma.DefaultCreateArgs>) {
        return this.prismaService.default.create(args);
    }

    findMany<T extends Prisma.DefaultFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.DefaultFindManyArgs>) {
        return this.prismaService.default.findMany(args);
    }

    upsert<T extends Prisma.DefaultUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.DefaultUpsertArgs>) {
        return this.prismaService.default.upsert(args);
    }

    deleteMany<T extends Prisma.DefaultDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.DefaultDeleteManyArgs>) {
        return this.prismaService.default.deleteMany(args);
    }
}
