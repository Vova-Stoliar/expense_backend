import { PartialType } from '@nestjs/mapped-types';
import type { CategoryTransaction } from '@prisma/client';
import { CreateTransactionDto } from './create-transaction.dto';
import type { PartialPick } from '~/shared/types';

type IUpdateTransactionDto = PartialPick<CategoryTransaction, 'amount' | 'notes'>;

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) implements IUpdateTransactionDto {}
