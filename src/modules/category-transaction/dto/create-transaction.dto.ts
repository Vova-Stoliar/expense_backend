import type { CategoryTransaction } from '@prisma/client';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

type ICreateTransactionDto = Pick<CategoryTransaction, 'amount' | 'notes'>;

export class CreateTransactionDto implements ICreateTransactionDto {
    @IsNotEmpty()
    @IsInt()
    amount!: ICreateTransactionDto['amount'];

    @IsString()
    notes = '';
}
