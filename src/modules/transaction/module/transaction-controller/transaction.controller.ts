import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreateTransactionDto } from '~/modules/transaction/dto';
import { TransactionService } from '~/modules/transaction/module/transaction-service';
import type { CreateParams } from '~/modules/transaction/types';
import { GetUserFromReq } from '~/shared/decorators';

// TODO probably rename to CategoryTransactionController

@Controller('categories/transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post(':categoryId')
    create(
        @Body() createTransactionDto: CreateTransactionDto,
        @Param(ParseUUIDPipe) categoryId: CreateParams['categoryId'],
        @GetUserFromReq() user: CreateParams['user']
    ) {
        return this.transactionService.create({ transactionToCreate: createTransactionDto, categoryId, user });
    }

    @Get()
    getAll() {
        return this.transactionService.getAll();
    }
}
