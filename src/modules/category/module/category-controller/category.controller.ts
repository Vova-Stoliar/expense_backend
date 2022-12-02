import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import type { User } from '@prisma/client';
import { CreateCategoryDto, UpdateCategoryDto } from '~/modules/category/dto';
import { CreateDefaultCategoriesDto } from '~/modules/category/dto/create-default-categories.dto';
import { getPolicyHandlers } from '~/modules/category/lib/get-policy-handlers/get-policy-handlers.lib';
import type { CreateParams, DeleteParams, UpdateParams } from '~/modules/category/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';
import { CheckPolicies } from '~/shared/decorators/check-policies.decorator';
import type { Category } from '~/shared/types';
import { CategoryService } from '../category-service/category.service';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUserFromReq() user: CreateParams['user']
    ): Promise<Category[]> {
        return this.categoryService.create({ categoryToCreate: createCategoryDto, user });
    }

    @Post('default')
    @CheckPolicies(getPolicyHandlers().createDefaultCategories)
    createDefaultCategories(@Body() defaultCategories: CreateDefaultCategoriesDto) {
        return this.categoryService.createDefaultCategories(defaultCategories);
    }

    @Get()
    getAll(@GetUserFromReqPropertyByKey('id') id: User['id']): Promise<Category[]> {
        return this.categoryService.getAll({ id });
    }

    @Patch(':id')
    update(
        @Body() fieldsToUpdateById: UpdateCategoryDto,
        @Param('id') id: UpdateParams['id'],
        @GetUserFromReq() user: UpdateParams['user']
    ): Promise<Category[]> {
        return this.categoryService.update({ id, user, fieldsToUpdateById });
    }

    @Delete(':id')
    delete(
        @Param('id', ParseUUIDPipe) id: DeleteParams['id'],
        @GetUserFromReq() user: DeleteParams['user']
    ): Promise<Category[]> {
        return this.categoryService.delete({ id, user });
    }
}
