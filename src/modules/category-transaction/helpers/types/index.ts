import type { CategoryTransaction } from '@prisma/client';
import type { CreateParams } from '~/modules/category-transaction/types';

export type CreateTransaction = Omit<CreateParams, 'transactionToCreate'> & {
    transactionToCreate: Pick<CategoryTransaction, 'id' | 'amount' | 'notes'>;
};
