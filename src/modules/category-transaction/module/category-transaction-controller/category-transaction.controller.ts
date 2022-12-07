import { Body, Controller, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { CategoryTransaction } from '@prisma/client';
import { Create, GetAll } from '~/modules/category-transaction/decorators/routes';
import { CreateTransactionDto } from '~/modules/category-transaction/dto';
import { CategoryTransactionService } from '~/modules/category-transaction/module/category-transaction-service';
import type { CreateParams, GetAllCategories } from '~/modules/category-transaction/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';

@ApiBearerAuth()
@Controller('categories/transaction')
export class CategoryTransactionController {
    constructor(private readonly transactionService: CategoryTransactionService) {}

    @Create()
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('categoryId', ParseUUIDPipe) categoryId: CreateParams['categoryId'],
        @GetUserFromReq() user: CreateParams['user']
    ): Promise<Pick<CategoryTransaction, 'id' | 'amount' | 'notes'>> {
        return this.transactionService.create({ transactionToCreate: createTransactionDto, categoryId, user });
    }

    @GetAll()
    getAll(
        @GetUserFromReqPropertyByKey('id') userId: GetAllCategories['userId'],
        @Param('categoryId', ParseUUIDPipe) categoryId: GetAllCategories['categoryId']
    ) {
        return this.transactionService.getAll({ userId, categoryId });
    }
}
