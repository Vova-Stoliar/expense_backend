import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import type { User } from '@prisma/client';
import { CreateCategoryDto } from '~/modules/category/dto/create-category.dto';
import { CreateDefaultCategoriesDto } from '~/modules/category/dto/create-default-categories.dto';
import { UpdateCategoryDto } from '~/modules/category/dto/update-category.dto';
import { getPolicyHandlers } from '~/modules/category/lib/get-policy-handlers.lib';
import { GetUserFromReq } from '~/shared/decorators';
import { CheckPolicies } from '~/shared/decorators/check-policies.decorator';
import type { Category, Replace } from '~/shared/types';
import { CategoryService } from '../category-service/category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUserFromReq() user: Replace<User, 'categories', Category[]>
    ): Promise<Category[]> {
        return this.categoryService.create({ categoryToCreate: createCategoryDto, user });
    }

    @Post('default')
    @CheckPolicies(getPolicyHandlers().createDefaultCategories)
    createDefaultCategories(@Body() defaultCategories: CreateDefaultCategoriesDto) {
        return this.categoryService.createDefaultCategories(defaultCategories);
    }

    @Get()
    getAll() {
        return this.categoryService.getAll();
    }

    @Patch(':id')
    update(
        @Param('id') id: Category['id'],
        @Body() updateCategoryDto: UpdateCategoryDto,
        @GetUserFromReq() user: Replace<User, 'categories', Category[]>
    ) {
        return this.categoryService.update({ id, user, fieldsToUpdateById: updateCategoryDto });
    }

    @Delete(':id')
    delete(
        @Param('id', ParseUUIDPipe) id: Category['id'],
        @GetUserFromReq() user: Replace<User, 'categories', Category[]>
    ) {
        return this.categoryService.delete({ id, user });
    }
}
