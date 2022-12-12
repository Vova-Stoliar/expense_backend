import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type {
    CreateTransactionParams,
    DeleteTransactionParams,
    UpdateTransactionParams,
} from '~/modules/category-transaction/helpers/types';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';

@Injectable()
export class TransactionHelper {
    constructor(
        private userRepository: UserRepository,
        private categoryTransactionRepository: CategoryTransactionRepository,
        private prismaService: PrismaService
    ) {}

    async createTransaction(params: CreateTransactionParams) {
        const { transactionToCreate, categoryId, user } = params;
        const { categories, id } = user;

        await this.prismaService.$transaction([
            this.userRepository.updateMany({
                where: {
                    id,
                },
                data: {
                    categories: categories as unknown as Prisma.JsonArray,
                },
            }),

            this.categoryTransactionRepository.createMany({
                data: {
                    categoryId,
                    userId: id,
                    ...transactionToCreate,
                },
            }),
        ]);
    }

    async deleteTransaction(params: DeleteTransactionParams) {
        const { userId, transaction, categories } = params;

        await this.prismaService.$transaction([
            this.categoryTransactionRepository.deleteMany({
                where: {
                    id: transaction.id,
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

    async updateTransaction(params: UpdateTransactionParams) {
        const { userId, transaction, categories } = params;

        await this.prismaService.$transaction([
            this.categoryTransactionRepository.updateMany({
                where: {
                    id: transaction.id,
                },
                data: transaction,
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
