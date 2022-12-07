import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import type { CategoryTransaction } from '@prisma/client';
import { getSwaggerParamExample, getSwaggerResponseExample } from '~/modules/category-transaction/constants/swagger';
import { CreateTransactionDto } from '~/modules/category-transaction/dto';
import { CategoryTransactionService } from '~/modules/category-transaction/module/transaction-service';
import type { CreateParams, GetAll } from '~/modules/category-transaction/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';

@ApiBearerAuth()
@Controller('categories/transaction')
export class CategoryTransactionController {
    constructor(private readonly transactionService: CategoryTransactionService) {}

    @Post(':categoryId')
    @ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() })
    @ApiCreatedResponse({ schema: { example: getSwaggerResponseExample() } })
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param('categoryId', ParseUUIDPipe) categoryId: CreateParams['categoryId'],
        @GetUserFromReq() user: CreateParams['user']
    ): Promise<Pick<CategoryTransaction, 'id' | 'amount' | 'notes'>> {
        return this.transactionService.create({ transactionToCreate: createTransactionDto, categoryId, user });
    }

    @Get(':categoryId')
    @ApiParam({ name: 'categoryId', required: true, example: getSwaggerParamExample() })
    @ApiOkResponse({ schema: { example: [getSwaggerResponseExample()] } })
    getAll(
        @GetUserFromReqPropertyByKey('id') userId: GetAll['userId'],
        @Param('categoryId', ParseUUIDPipe) categoryId: GetAll['categoryId']
    ) {
        return this.transactionService.getAll({ userId, categoryId });
    }
}
