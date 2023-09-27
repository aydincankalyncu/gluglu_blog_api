import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory-dto';
import { BaseResult } from 'src/utils/result/base-result';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService : CategoryService){}

  @Post('/add')
  async addCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<BaseResult>{
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async listAllCategories(): Promise<BaseResult>{
    return this.categoryService.listAllCategories();
  }
}
