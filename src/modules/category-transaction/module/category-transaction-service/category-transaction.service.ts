import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TransactionFacadeHelper } from '~/modules/category-transaction/helpers/classes/transaction-facade-helper';
import { updateCategory } from '~/modules/category-transaction/lib';
import type * as Types from '~/modules/category-transaction/types';
import { validateIsValueDefined } from '~/shared/lib';
import type { BaseCategoryTransaction, DateTime } from '~/shared/types';

@Injectable()
export class CategoryTransactionService {
    constructor(private transactionFacadeHelper: TransactionFacadeHelper) {}

    async create(
        params: Types.CreateTransaction
    ): Promise<Replace<BaseCategoryTransaction, 'updatedAt' | 'createdAt', DateTime['createdAt']>> {
        const { transactionToCreate, categoryId, user } = params;

        const category = validateIsValueDefined({
            value: user.categories.find((category) => category.id === categoryId),
            error: new BadRequestException(),
        });

        const { categories, updatedAt } = updateCategory({
            categoryId,
            updatedCategoryFields: { amount: category.amount + transactionToCreate.amount },
            categories: user.categories,
        });

        return this.transactionFacadeHelper.createTransaction({
            transactionToCreate: { ...transactionToCreate, updatedAt, createdAt: updatedAt, id: uuid() },
            categoryId,
            user: { id: user.id, categories },
        });
    }

    async getAll(params: Types.GetAllTransactions): Promise<BaseCategoryTransaction[]> {
        return this.transactionFacadeHelper.getAllTransactions(params);
    }

    async delete(params: Types.DeleteTransaction): Promise<void> {
        const { categoryId, user, transactionId } = params;

        const category = validateIsValueDefined({
            value: user.categories.find((category) => category.id === categoryId),
            error: new BadRequestException(),
        });

        const transaction = await this.transactionFacadeHelper.validateTransaction({
            id: transactionId,
            categoryId,
        });

        const { categories } = updateCategory({
            updatedCategoryFields: { amount: category.amount + transaction.amount },
            categoryId,
            categories: user.categories,
        });

        await this.transactionFacadeHelper.deleteTransaction({ transaction, userId: user.id, categories });
    }

    async get(params: Types.GetTransaction): Promise<BaseCategoryTransaction> {
        const { categoryId, transactionId } = params;

        return this.transactionFacadeHelper.validateTransaction({ id: transactionId, categoryId });
    }

    async update(
        params: Types.UpdateTransaction
    ): Promise<Replace<BaseCategoryTransaction, 'updatedAt', DateTime['updatedAt']>> {
        const { categoryId, transactionId, fieldsToUpdate, user } = params;
        const { amount = 0 } = fieldsToUpdate;

        const category = validateIsValueDefined({
            value: user.categories.find((category) => category.id === categoryId),
            error: new BadRequestException(),
        });

        const transaction = await this.transactionFacadeHelper.validateTransaction({
            id: transactionId,
            categoryId,
        });

        const { categories, updatedAt } = updateCategory({
            updatedCategoryFields: { amount: category.amount - transaction.amount + amount },
            categoryId,
            categories: user.categories,
        });

        return this.transactionFacadeHelper.updateTransaction({
            transaction: { ...transaction, ...fieldsToUpdate, updatedAt },
            categories,
            userId: user.id,
        });
    }
}
