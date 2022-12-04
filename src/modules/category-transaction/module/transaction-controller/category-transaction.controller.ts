import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateTransactionDto } from '~/modules/category-transaction/dto';
import { CategoryTransactionService } from '~/modules/category-transaction/module/transaction-service';
import type { CreateParams, GetAll } from '~/modules/category-transaction/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';

// TODO probably rename to CategoryTransactionController

@Controller('categories/transaction')
export class CategoryTransactionController {
    constructor(private readonly transactionService: CategoryTransactionService) {}

    @Post(':categoryId')
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('categoryId', ParseUUIDPipe) categoryId: CreateParams['categoryId'],
        @GetUserFromReq() user: CreateParams['user']
    ) {
        return this.transactionService.create({ transactionToCreate: createTransactionDto, categoryId, user });
    }

    @Get(':categoryId')
    getAll(
        @GetUserFromReqPropertyByKey('id') userId: GetAll['userId'],
        @Param('categoryId', ParseUUIDPipe) categoryId: GetAll['categoryId']
    ) {
        return this.transactionService.getAll({ userId, categoryId });
    }
}
