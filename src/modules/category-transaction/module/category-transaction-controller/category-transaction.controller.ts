import { Body, Param, ParseUUIDPipe } from '@nestjs/common';
import type { CategoryTransaction } from '@prisma/client';
import { CreateTransactionDto } from '~/modules/category-transaction/dto';
import { CategoryTransactionService } from '~/modules/category-transaction/module/category-transaction-service';
import type { CreateParams, GetAllCategories } from '~/modules/category-transaction/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';
import * as Controller from '~/modules/category-transaction/decorators/controller';

@Controller.Controller()
export class CategoryTransactionController {
    constructor(private readonly transactionService: CategoryTransactionService) {}

    @Controller.Create()
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('categoryId', ParseUUIDPipe) categoryId: CreateParams['categoryId'],
        @GetUserFromReq() user: CreateParams['user']
    ): Promise<Pick<CategoryTransaction, 'id' | 'amount' | 'notes'>> {
        return this.transactionService.create({ transactionToCreate: createTransactionDto, categoryId, user });
    }

    @Controller.GetAll()
    getAll(
        @GetUserFromReqPropertyByKey('id') userId: GetAllCategories['userId'],
        @Param('categoryId', ParseUUIDPipe) categoryId: GetAllCategories['categoryId']
    ) {
        return this.transactionService.getAll({ userId, categoryId });
    }
}
