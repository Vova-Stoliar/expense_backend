import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { TransactionFacadeHelper } from '../classes/transaction-facade-helper';
import { TransactionHelper } from '../classes/transaction-helper';

export const HelpersProvider: Provider[] = [TransactionHelper, TransactionFacadeHelper];
