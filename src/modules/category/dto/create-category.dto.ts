import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { Category } from '~/shared/types';

type ICreateCategoryDto = Pick<Category, 'name' | 'amount' | 'notes'>;

export class CreateCategoryDto implements ICreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNumber()
    amount = 0;

    @IsString()
    notes = '';
}
