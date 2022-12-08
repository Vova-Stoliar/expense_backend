import { Injectable } from '@nestjs/common';
import type { CategoryTransaction } from '@prisma/client';
import { TransactionHelper } from '~/modules/category-transaction/helpers/classes/transaction-helper';
import type * as Types from '~/modules/category-transaction/helpers/types';
import type { GetAllTransactions } from '~/modules/category-transaction/types';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import type { BaseCategoryTransaction, DateTime, Replace } from '~/shared/types';

@Injectable()
export class TransactionFacadeHelper {
    constructor(
        private transactionHelper: TransactionHelper,
        private categoryTransactionRepository: CategoryTransactionRepository
    ) {}

    async createTransaction(
        params: Types.CreateTransactionParams
    ): Promise<Replace<BaseCategoryTransaction, 'updatedAt' | 'createdAt', DateTime['createdAt']>> {
        await this.transactionHelper.createTransaction(params);

        return params.transactionToCreate;
    }

    async getAllTransactions(params: GetAllTransactions): Promise<BaseCategoryTransaction[]> {
        const { userId, categoryId } = params;

        return this.categoryTransactionRepository.findMany({
            where: { userId, categoryId },
            select: { notes: true, amount: true, createdAt: true, id: true, updatedAt: true },
        });
    }

    async deleteTransaction(params: Types.DeleteTransactionParams): Promise<void> {
        await this.transactionHelper.deleteTransaction(params);
    }

    async updateTransaction(
        params: Types.UpdateTransactionParams
    ): Promise<Replace<BaseCategoryTransaction, 'updatedAt', DateTime['updatedAt']>> {
        await this.transactionHelper.updateTransaction(params);

        return params.transaction;
    }

    async validateTransaction(
        params: Pick<CategoryTransaction, 'id' | 'categoryId'>
    ): Promise<BaseCategoryTransaction> {
        const { id, categoryId } = params;

        return this.categoryTransactionRepository.findFirstOrThrow({
            where: {
                id,
                categoryId,
            },
        });
    }
}
