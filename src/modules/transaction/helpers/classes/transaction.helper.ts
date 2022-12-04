import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import type { CreateTransaction } from '~/modules/transaction/helpers/types';
import { TransactionRepository } from '~/repositories/transaction';
import { PrismaService } from '~/shared/modules/prisma';
import { UserRepository } from '~/shared/repositories/user';

@Injectable()
export class TransactionHelper {
    constructor(
        private userRepository: UserRepository,
        private transactionRepository: TransactionRepository,
        private prismaService: PrismaService
    ) {}

    async createTransaction(params: CreateTransaction) {
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

            this.transactionRepository.createMany({
                data: {
                    categoryId,
                    userId: id,
                    ...transactionToCreate,
                },
            }),
        ]);
    }
}
