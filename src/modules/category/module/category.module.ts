import { Module } from '@nestjs/common';
import { CategoryExistenceGuard } from '~/modules/category/guards';
import { DefaultRepository } from '~/shared/repositories/default';
import { UserRepository } from '~/shared/repositories/user';
import { CategoryService } from './category-service/category.service';
import { CategoryController } from './category-controller/category.controller';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, UserRepository, DefaultRepository, CategoryExistenceGuard],
})
export class CategoryModule {}
