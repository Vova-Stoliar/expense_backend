import { Injectable } from '@nestjs/common';
import { TransactionHelper } from '~/modules/transaction/helpers/classes/transaction.helper';
import type { CreateTransaction } from '~/modules/transaction/helpers/types';
import type { GetAll } from '~/modules/transaction/types';
import { TransactionRepository } from '~/repositories/transaction';

@Injectable()
export class TransactionFacadeHelper {
    constructor(private transactionHelper: TransactionHelper, private transactionRepository: TransactionRepository) {}

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
