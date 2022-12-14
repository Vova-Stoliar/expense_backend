import { Module } from '@nestjs/common';
import { HelpersProvider } from '~/modules/category/helpers/provider';
import { DefaultRepository } from '~/repositories/default';
import { CategoryTransactionRepository } from '~/repositories/category-transaction';
import { UserRepository } from '~/shared/repositories/user';
import { CategoryController } from './category-controller/category.controller';
import { CategoryService } from './category-service/category.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, UserRepository, DefaultRepository, CategoryTransactionRepository, ...HelpersProvider],
})
export class CategoryModule {}
