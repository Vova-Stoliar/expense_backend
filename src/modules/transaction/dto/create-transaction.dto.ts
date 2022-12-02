import type { Transaction } from '@prisma/client';
import { IsInt, IsNotEmpty } from 'class-validator';

type ICreateTransactionDto = Pick<Transaction, 'amount' | 'notes'>;

export class CreateTransactionDto implements ICreateTransactionDto {
    @IsNotEmpty()
    @IsInt()
    amount!: ICreateTransactionDto['amount'];
    notes = '';
}
