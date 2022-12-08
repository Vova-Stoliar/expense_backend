import type { Prisma } from '@prisma/client';
import type { BaseCategoryTransaction } from '~/shared/types';

export function addDefaultSelectValues({ select }: { select: Prisma.CategoryTransactionSelect | null | undefined }) {
    const DEFAULT_SELECT_VALUES: Record<keyof BaseCategoryTransaction, boolean> = {
        id: true,
        amount: true,
        notes: true,
        updatedAt: true,
        createdAt: true,
    };

    return Object.assign(DEFAULT_SELECT_VALUES, select);
}
