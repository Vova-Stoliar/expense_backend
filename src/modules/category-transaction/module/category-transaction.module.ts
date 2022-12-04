import { Module } from '@nestjs/common';
import { HelpersProvider } from '~/modules/category-transaction/helpers/provider';
import { CategoryTransactionController } from '~/modules/category-transaction/module/transaction-controller';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { UserRepository } from '~/shared/repositories/user';
import { CategoryTransactionService } from './transaction-service/category-transaction.service';

@Module({
    controllers: [CategoryTransactionController],
    providers: [CategoryTransactionService, CategoryTransactionRepository, UserRepository, ...HelpersProvider],
})
export class CategoryTransactionModule {}
