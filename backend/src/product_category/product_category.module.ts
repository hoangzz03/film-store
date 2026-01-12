import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { DatabaseModule } from 'src/database/database.module';
import { productCategoryProvider } from 'src/provider/productCategory.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productCategoryProvider,
    ProductCategoryService],
  controllers: [ProductCategoryController],
  exports: [],
})
export class ProductCategoryModule { }
