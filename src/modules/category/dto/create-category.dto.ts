import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { Category } from '~/shared/types';

type ICreateCategoryDto = Pick<Category, 'name' | 'amount' | 'notes'>;

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name!: ICreateCategoryDto['name'];

    @ApiPropertyOptional({ default: 0, type: 'number' })
    @IsNumber()
    amount = 0;

    @ApiPropertyOptional({ default: '', type: 'string' })
    @IsString()
    notes = '';
}
