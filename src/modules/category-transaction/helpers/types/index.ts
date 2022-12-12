import type { CategoryTransaction, User } from '@prisma/client';
import type { CreateTransaction } from '~/modules/category-transaction/types';
import type { BaseCategoryTransaction, Category, DateTime } from '~/shared/types';

export type CreateTransactionParams = Omit<CreateTransaction, 'transactionToCreate'> & {
    transactionToCreate: Replace<BaseCategoryTransaction, 'createdAt' | 'updatedAt', DateTime['updatedAt']>;
};

export interface DeleteTransactionParams {
    categories: Category[];
    transaction: Pick<CategoryTransaction, 'id'>;
    userId: User['id'];
}

export interface UpdateTransactionParams {
    categories: Category[];
    userId: User['id'];
    transaction: Replace<BaseCategoryTransaction, 'updatedAt', DateTime['updatedAt']>;
}
