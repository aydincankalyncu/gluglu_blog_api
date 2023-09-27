import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory-dto';
import { BaseResult } from 'src/utils/result/base-result';
import { SuccessResult } from 'src/utils/result/success-result';
import { ErrorResult } from 'src/utils/result/error-result';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<BaseResult> {
    const { slug, title, image } = createCategoryDto;
    try {
      const category = this.categoryRepository.create({
        slug,
        title,
        image,
      });
      await this.categoryRepository.save(category);
      return new SuccessResult(`${title} category created`, category);
    } catch (error) {
      return new ErrorResult(
        `Error occured while saving category. Category name is: ${title}`,
        error,
      );
    }
  }

  async listAllCategories(): Promise<BaseResult> {
    try {
      const categories: Category[] = await this.categoryRepository.find({
        relations: ['posts'],
      });
      return new SuccessResult('Categories have been listed', categories);
    } catch (error) {
      return new ErrorResult(
        'Error occured while retrieving categories',
        error,
      );
    }
  }
}
