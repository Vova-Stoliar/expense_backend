import { v4 as uuid } from 'uuid';
import type { CreateParams } from '~/modules/category-transaction/types';

export function transformTransaction(transactionToCreate: CreateParams['transactionToCreate']) {
    return {
        id: uuid(),
        ...transactionToCreate,
    };
}
