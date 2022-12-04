import type { CreateTransactionDto } from '~/modules/transaction/dto';
import type { CreateParams } from '~/modules/transaction/types';

type Categories = Pick<CreateParams['user'], 'categories'>;

export interface TransformCategories extends Categories, Pick<CreateParams, 'categoryId'> {
    transactionAmount: CreateTransactionDto['amount'];
}
