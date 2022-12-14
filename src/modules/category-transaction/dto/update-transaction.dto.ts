import { PartialType } from '@nestjs/swagger';
import type { CategoryTransaction } from '@prisma/client';
import { CreateTransactionDto } from './create-transaction.dto';

type IUpdateTransactionDto = PartialPick<CategoryTransaction, 'amount' | 'notes'>;

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) implements IUpdateTransactionDto {}
