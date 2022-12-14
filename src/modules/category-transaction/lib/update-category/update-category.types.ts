import type { CreateTransaction, UpdateTransaction } from '~/modules/category-transaction/types';
import type { Category } from '~/shared/types';

type Categories = Pick<CreateTransaction['user'], 'categories'>;
type CategoryId = Pick<UpdateTransaction, 'categoryId'>;

export interface UpdateCategoriesParams extends CategoryId, Categories {
    updatedCategoryFields: Partial<Category>;
}
