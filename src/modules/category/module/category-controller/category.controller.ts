import { Body, Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { User } from '@prisma/client';
import { Create, CreateDefaultCategories, GetAll, Update } from '~/modules/category/decorators/routes';
import { CreateCategoryDto, UpdateCategoryDto } from '~/modules/category/dto';
import { CreateDefaultCategoriesDto } from '~/modules/category/dto/create-default-categories.dto';
import type { CreateParams, DeleteParams, UpdateParams } from '~/modules/category/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';
import type { Category } from '~/shared/types';
import { CategoryService } from '../category-service/category.service';

@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Create()
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUserFromReq() user: CreateParams['user']
    ): Promise<Category> {
        return this.categoryService.create({ categoryToCreate: createCategoryDto, user });
    }

    @CreateDefaultCategories()
    createDefaultCategories(@Body() defaultCategories: CreateDefaultCategoriesDto): Promise<Category[]> {
        return this.categoryService.createDefaultCategories(defaultCategories);
    }

    @GetAll()
    getAll(@GetUserFromReqPropertyByKey('id') id: User['id']): Promise<Category[]> {
        return this.categoryService.getAll({ id });
    }

    @Update()
    update(
        @Body() fieldsToUpdateById: UpdateCategoryDto,
        @Param('id') id: UpdateParams['id'],
        @GetUserFromReq() user: UpdateParams['user']
    ): Promise<Category> {
        return this.categoryService.update({ id, user, fieldsToUpdateById });
    }

    @Delete()
    delete(
        @Param('id', ParseUUIDPipe) id: DeleteParams['id'],
        @GetUserFromReq() user: DeleteParams['user']
    ): Promise<Category[]> {
        return this.categoryService.delete({ id, user });
    }
}
