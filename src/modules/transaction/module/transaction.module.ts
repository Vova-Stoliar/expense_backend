import { Module } from '@nestjs/common';
import { HelpersProvider } from '~/modules/transaction/helpers/provider';
import { TransactionController } from '~/modules/transaction/module/transaction-controller';
import { TransactionRepository } from '~/repositories/transaction';
import { UserRepository } from '~/shared/repositories/user';
import { TransactionService } from './transaction-service/transaction.service';

// TODO rename transaction because it is confusing

@Module({
    controllers: [TransactionController],
    providers: [TransactionService, TransactionRepository, UserRepository, ...HelpersProvider],
})
export class TransactionModule {}
