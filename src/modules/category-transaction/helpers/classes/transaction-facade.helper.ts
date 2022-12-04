import { Injectable } from '@nestjs/common';
import { TransactionHelper } from '~/modules/category-transaction/helpers/classes/transaction.helper';
import type { CreateTransaction } from '~/modules/category-transaction/helpers/types';
import type { GetAll } from '~/modules/category-transaction/types';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';

@Injectable()
export class TransactionFacadeHelper {
    constructor(
        private transactionHelper: TransactionHelper,
        private transactionRepository: CategoryTransactionRepository
    ) {}

    async createTransaction(params: CreateTransaction) {
        await this.transactionHelper.createTransaction(params);

        return params.transactionToCreate;
    }

    async getAll(params: GetAll) {
        const { userId, categoryId } = params;

        return this.transactionRepository.findMany({
            where: { userId, categoryId },
            select: { notes: true, amount: true, createdAt: true },
        });
    }
}
