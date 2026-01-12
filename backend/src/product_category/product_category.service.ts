import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject('PRODUCT_CATEGORY_REPOSITORY')
    private productCategoryRepository: Repository<ProductCategory>
  ) { };
  async findAll() {
    return await this.productCategoryRepository.find();
  }
  async getProductCategoryById(id: number) {
    const category = this.productCategoryRepository.find({ where: { id: id } });
    if (!category) throw new NotFoundException('category not found')
    return category
  }
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    const newCategory = {
      ...createProductCategoryDto
    }
    await this.productCategoryRepository.save(newCategory)
    return newCategory;
  }

  async update(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const category = await this.getProductCategoryById(id);
        if (!category) {
            throw new NotFoundException('category not found')
        }
        await this.productCategoryRepository.update(id, updateProductCategoryDto);
        return category;
  }

  async remove(id: number) {
    const category = await this.getProductCategoryById(id);
        if (!category) {
            throw new NotFoundException('category not found');
        }
        await this.productCategoryRepository.delete(id);
        return category;
  }
}
