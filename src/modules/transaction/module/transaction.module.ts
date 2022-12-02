import { Module } from '@nestjs/common';
import { TransactionService } from './transaction-service/transaction.service';
import { TransactionController } from '~/modules/transaction/module/transaction-controller';

@Module({
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
