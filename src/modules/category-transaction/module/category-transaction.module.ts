import { Module } from '@nestjs/common';
import { HelpersProvider } from '~/modules/category-transaction/helpers/provider';
import { CategoryTransactionController } from '~/modules/category-transaction/module/category-transaction-controller';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { UserRepository } from '~/shared/repositories/user';
import { CategoryTransactionService } from './category-transaction-service/category-transaction.service';

@Module({
    controllers: [CategoryTransactionController],
    providers: [CategoryTransactionService, CategoryTransactionRepository, UserRepository, ...HelpersProvider],
})
export class CategoryTransactionModule {}
