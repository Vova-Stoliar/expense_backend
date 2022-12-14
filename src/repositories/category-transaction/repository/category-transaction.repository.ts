import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';
import { addDefaultSelectValues } from './lib';

// implements Prisma.CategoryTransactionDelegate<undefined>

@Injectable()
export class CategoryTransactionRepository {
    constructor(private prismaService: PrismaService) {}

    create<T extends Prisma.CategoryTransactionCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionCreateArgs>
    ) {
        const { select } = args;

        return this.prismaService.categoryTransaction.create({ ...args, select: addDefaultSelectValues({ select }) });
    }

    delete<T extends Prisma.CategoryTransactionDeleteArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionDeleteArgs>
    ) {
        const { select } = args;

        return this.prismaService.categoryTransaction.delete({ ...args, select: addDefaultSelectValues({ select }) });
    }

    findMany<T extends Prisma.CategoryTransactionFindManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionFindManyArgs>
    ) {
        const { select } = args;

        return this.prismaService.categoryTransaction.findMany({ ...args, select: addDefaultSelectValues({ select }) });
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

    deleteMany<T extends Prisma.CategoryTransactionDeleteManyArgs>(
        args?: Prisma.SelectSubset<T, Prisma.CategoryTransactionDeleteManyArgs>
    ) {
        return this.prismaService.categoryTransaction.deleteMany(args);
    }

    findUniqueOrThrow<T extends Prisma.CategoryTransactionFindUniqueOrThrowArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionFindUniqueOrThrowArgs>
    ) {
        const { select } = args;

        return this.prismaService.categoryTransaction.findUniqueOrThrow({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    findFirstOrThrow<T extends Prisma.CategoryTransactionFindFirstOrThrowArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionFindFirstOrThrowArgs>
    ) {
        const { select } = args;

        return this.prismaService.categoryTransaction.findFirstOrThrow({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    update<T extends Prisma.CategoryTransactionUpdateArgs>(
        args: Prisma.SelectSubset<T, Prisma.CategoryTransactionUpdateArgs>
    ) {
        const { select } = args;

        return this.prismaService.categoryTransaction.update({ ...args, select: addDefaultSelectValues({ select }) });
    }
}
