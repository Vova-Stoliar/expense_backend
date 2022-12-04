import type { CreateTransactionDto } from '~/modules/category-transaction/dto';
import type { CreateParams } from '~/modules/category-transaction/types';

type Categories = Pick<CreateParams['user'], 'categories'>;

export interface TransformCategories extends Categories, Pick<CreateParams, 'categoryId'> {
    transactionAmount: CreateTransactionDto['amount'];
}
