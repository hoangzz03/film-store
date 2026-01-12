import { Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProductCategory } from 'src/product_category/entities/product_category.entity';

export const productCategoryProvider = [
    {
        provide: 'PRODUCT_CATEGORY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductCategory),
        inject: ['DATA_SOURCE'],
    },
]; 