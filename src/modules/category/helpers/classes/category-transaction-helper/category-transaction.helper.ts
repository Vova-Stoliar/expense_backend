import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { DeleteCategoryTransaction } from '~/modules/category/helpers/types';
import { TransactionRepository } from '~/repositories/transaction';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';

@Injectable()
export class CategoryTransactionHelper {
    constructor(
        private userRepository: UserRepository,
        private prismaService: PrismaService,
        private transactionRepository: TransactionRepository
    ) {}

    async deleteCategoryTransaction(params: DeleteCategoryTransaction) {
        const { categories, otherCategoryId, deletedCategoryId, userId } = params;

        await this.prismaService.$transaction([
            this.transactionRepository.updateMany({
                where: {
                    categoryId: deletedCategoryId,
                },
                data: {
                    categoryId: otherCategoryId,
                },
            }),
            this.userRepository.updateMany({
                where: {
                    id: userId,
                },
                data: {
                    categories: categories as unknown as Prisma.JsonArray,
                },
            }),
        ]);
    }
}
