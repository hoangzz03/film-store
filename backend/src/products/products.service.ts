import { Product } from './entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory } from 'src/product_category/entities/product_category.entity';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('PRODUCT_CATEGORY_REPOSITORY')
    private productCategoryRepository: Repository<ProductCategory>
  ) { };

  async findAll() {
    return await this.productRepository.find({ relations: ['productCategory'] });
  }
  async getProductById(id: number) {
    const product = this.productRepository.find({ where: { id: id }, relations: ['productCategory'] });
    if (!product) throw new NotFoundException('product not found')
    return product
  }

  async getProductByCateId(id: number) {
    const product = this.productRepository.find({ where: { productCategory: { id: id } }, relations: ['productCategory'] });
    if (!product) throw new NotFoundException('product not found')
    return product
  }
  async create(createProductDto: CreateProductDto) {
    const { productCategory, ...rest } = createProductDto
    const category = await this.productCategoryRepository.findOne({ where: { name: String(productCategory) } });
    if (!category) {
      throw new NotFoundException('Product category not found');
    }

    const newProduct = this.productRepository.create({
      ...rest,
      productCategory: category
    });
    await this.productRepository.save(newProduct)
    return newProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new NotFoundException('product not found')
    }
    const { name, image, desc, price, detail, productCategory } = updateProductDto
    const category = await this.productCategoryRepository.findOne({ where: { name: String(productCategory) } });
    if (!category) {
      throw new NotFoundException('Product category not found');
    }

    const newProduct = this.productRepository.create({
      name, image, desc, price, detail,
      productCategory: category
    });
    await this.productRepository.update(id, newProduct);
    return product;
  }

  async remove(id: number) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    await this.productRepository.delete(id);
    return product;
  }
}
