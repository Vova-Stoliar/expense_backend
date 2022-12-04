import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';

// implements Prisma.CategoryTransactionDelegate<undefined>

@Injectable()
export class CategoryTransactionRepository {
    constructor(private prismaService: PrismaService) {}

    create<T extends Prisma.CategoryTransactionCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionCreateArgs>
    ) {
        return this.prismaService.categoryTransaction.create(args);
    }

    findMany<T extends Prisma.CategoryTransactionFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionFindManyArgs>
    ) {
        return this.prismaService.categoryTransaction.findMany(args);
    }

    createMany<T extends Prisma.CategoryTransactionCreateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionCreateManyArgs>
    ) {
        return this.prismaService.categoryTransaction.createMany(args);
    }

    updateMany<T extends Prisma.CategoryTransactionUpdateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionUpdateManyArgs>
    ) {
        return this.prismaService.categoryTransaction.updateMany(args);
    }
}
