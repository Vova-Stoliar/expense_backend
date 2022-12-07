import { Body, Param, ParseUUIDPipe } from '@nestjs/common';
import type { User } from '@prisma/client';
import * as Controller from '~/modules/category/decorators/controller';
import { CreateCategoryDto, UpdateCategoryDto } from '~/modules/category/dto';
import { CreateDefaultCategoriesDto } from '~/modules/category/dto/create-default-categories.dto';
import type { CreateParams, DeleteParams, UpdateParams } from '~/modules/category/types';
import { GetUserFromReq, GetUserFromReqPropertyByKey } from '~/shared/decorators';
import type { Category } from '~/shared/types';
import { CategoryService } from '../category-service/category.service';

@Controller.Controller()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Controller.Create()
    create(
        @Body() createCategoryDto: CreateCategoryDto,
        @GetUserFromReq() user: CreateParams['user']
    ): Promise<Category> {
        return this.categoryService.create({ categoryToCreate: createCategoryDto, user });
    }

    @Controller.CreateDefaultCategories()
    createDefaultCategories(@Body() defaultCategories: CreateDefaultCategoriesDto): Promise<Category[]> {
        return this.categoryService.createDefaultCategories(defaultCategories);
    }

    @Controller.GetAll()
    getAll(@GetUserFromReqPropertyByKey('id') id: User['id']): Promise<Category[]> {
        return this.categoryService.getAll({ id });
    }

    @Controller.Update()
    update(
        @Body() fieldsToUpdateById: UpdateCategoryDto,
        @Param('id') id: UpdateParams['id'],
        @GetUserFromReq() user: UpdateParams['user']
    ): Promise<Category> {
        return this.categoryService.update({ id, user, fieldsToUpdateById });
    }

    @Controller.Delete()
    delete(
        @Param('id', ParseUUIDPipe) id: DeleteParams['id'],
        @GetUserFromReq() user: DeleteParams['user']
    ): Promise<Category[]> {
        return this.categoryService.delete({ id, user });
    }
}
