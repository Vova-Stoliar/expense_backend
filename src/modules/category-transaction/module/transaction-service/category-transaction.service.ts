import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionFacadeHelper } from '~/modules/category-transaction/helpers/classes/transaction-facade.helper';
import { transformTransaction, transformCategories } from '~/modules/category-transaction/lib';
import type { CreateParams, GetAll } from '~/modules/category-transaction/types';
import { validateIsValueDefined } from '~/shared/lib';

@Injectable()
export class CategoryTransactionService {
    constructor(private transactionFacadeHelper: TransactionFacadeHelper) {}

    async create(params: CreateParams) {
        const { transactionToCreate, categoryId, user } = params;

        validateIsValueDefined({
            value: user.categories.find((category) => category.id === categoryId),
            error: new BadRequestException(),
        });

        const categories = transformCategories({
            categoryId,
            transactionAmount: transactionToCreate.amount,
            categories: user.categories,
        });

        return this.transactionFacadeHelper.createTransaction({
            transactionToCreate: transformTransaction(transactionToCreate),
            categoryId,
            user: { id: user.id, categories },
        });
    }

    async getAll(params: GetAll) {
        return this.transactionFacadeHelper.getAll(params);
    }
}
