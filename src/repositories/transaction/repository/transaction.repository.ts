import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';

// implements Prisma.TransactionDelegate<undefined>

@Injectable()
export class TransactionRepository {
    constructor(private prismaService: PrismaService) {}

    create<T extends Prisma.TransactionCreateArgs>(args: Prisma.SelectSubset<T, Prisma.TransactionCreateArgs>) {
        return this.prismaService.transaction.create(args);
    }

    findMany<T extends Prisma.TransactionFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs>) {
        return this.prismaService.transaction.findMany(args);
    }
}
