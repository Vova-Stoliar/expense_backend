import type { User } from '@prisma/client';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import type { CategoryTransactionService } from '~/modules/category-transaction/module/category-transaction-service';
import type { Category } from '~/shared/types';

interface CetCategoryTransactionParams {
    categoryTransactionService: CategoryTransactionService;
    category: Category;
    userId: User['id'];
}

export async function getCategoryTransaction(params: CetCategoryTransactionParams) {
    const { categoryTransactionService, category, userId } = params;

    const { amount, notes } = generateCategoryTransaction();

    const acceptValue = {
        categoryId: category.id,
        transactionToCreate: { amount, notes },
        user: {
            id: userId,
            categories: [category],
        },
    };

    return categoryTransactionService.create(acceptValue);
}
