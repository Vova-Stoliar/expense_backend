import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateCategoryDto } from '~/modules/category/dto/create-category.dto';

interface ICreateDefaultCategoryDto {
    categories: CreateCategoryDto[];
}

export class CreateDefaultCategoriesDto implements ICreateDefaultCategoryDto {
    @IsNotEmpty()
    @IsArray()
    @Type(() => CreateCategoryDto)
    @ValidateNested({ each: true })
    categories!: CreateCategoryDto[];
}
