import type { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { TransactionFacadeHelper } from '~/modules/transaction/helpers/classes/transaction-facade.helper';
import { TransactionHelper } from '~/modules/transaction/helpers/classes/transaction.helper';

export const HelpersProvider: Provider[] = [TransactionHelper, TransactionFacadeHelper];
