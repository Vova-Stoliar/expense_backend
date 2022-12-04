import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CategoryFacadeHelper } from '~/modules/category/helpers/classes/category-facade-helper';
import { CategoryTransactionHelper } from '~/modules/category/helpers/classes/category-transaction-helper';

export const HelpersProvider: Provider[] = [CategoryFacadeHelper, CategoryTransactionHelper];
