import { Body, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import * as Controller from '~/modules/category-transaction/decorators/controller';
import { CreateTransactionDto, UpdateTransactionDto } from '~/modules/category-transaction/dto';
import { CategoryTransactionService } from '~/modules/category-transaction/module/category-transaction-service';
import type * as Types from '~/modules/category-transaction/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';
import type { BaseCategoryTransaction, DateTime, Replace } from '~/shared/types';

@Controller.Controller()
export class CategoryTransactionController {
    constructor(private readonly transactionService: CategoryTransactionService) {}

    @Controller.Create()
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('categoryId', ParseUUIDPipe) categoryId: Types.CreateTransaction['categoryId'],
        @GetUserFromReq() user: Types.CreateTransaction['user']
    ): Promise<Replace<BaseCategoryTransaction, 'updatedAt' | 'createdAt', DateTime['createdAt']>> {
        return this.transactionService.create({ transactionToCreate: createTransactionDto, categoryId, user });
    }

    @Controller.GetAll()
    getAll(
        @GetUserFromReqPropertyByKey('id') userId: Types.GetAllTransactions['userId'],
        @Param('categoryId', ParseUUIDPipe) categoryId: Types.GetAllTransactions['categoryId']
    ): Promise<BaseCategoryTransaction[]> {
        return this.transactionService.getAll({ userId, categoryId });
    }

    @Delete(':categoryId/:transactionId')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('categoryId', ParseUUIDPipe) categoryId: Types.DeleteTransaction['categoryId'],
        @Param('transactionId', ParseUUIDPipe) transactionId: Types.DeleteTransaction['transactionId'],
        @GetUserFromReq() user: Types.DeleteTransaction['user']
    ): Promise<void> {
        await this.transactionService.delete({ transactionId, categoryId, user });
    }

    @Get(':categoryId/:transactionId')
    get(
        @Param('categoryId', ParseUUIDPipe) categoryId: Types.GetTransaction['categoryId'],
        @Param('transactionId', ParseUUIDPipe) transactionId: Types.GetTransaction['transactionId']
    ): Promise<BaseCategoryTransaction> {
        return this.transactionService.get({ categoryId, transactionId });
    }

    @Patch(':categoryId/:transactionId')
    update(
        @Param('categoryId', ParseUUIDPipe) categoryId: Types.UpdateTransaction['categoryId'],
        @Param('transactionId', ParseUUIDPipe) transactionId: Types.UpdateTransaction['transactionId'],
        @Body() fieldsToUpdate: UpdateTransactionDto,
        @GetUserFromReq() user: Types.DeleteTransaction['user']
    ): Promise<Replace<BaseCategoryTransaction, 'updatedAt', DateTime['updatedAt']>> {
        return this.transactionService.update({ categoryId, transactionId, fieldsToUpdate, user });
    }
}
