import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { CategoryFacadeHelper } from '../classes/category-facade-helper';
import { TransactionHelper } from '../classes/transaction-helper';

export const HelpersProvider: Provider[] = [CategoryFacadeHelper, TransactionHelper];
