import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { DeleteCategoryTransaction } from '~/modules/category/helpers/types';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';

@Injectable()
export class TransactionHelper {
    constructor(
        private userRepository: UserRepository,
        private prismaService: PrismaService,
        private transactionRepository: CategoryTransactionRepository
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
