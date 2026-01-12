import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { productProvider } from 'src/provider/products.provider';
import { DatabaseModule } from 'src/database/database.module';
import { productCategoryProvider } from 'src/provider/productCategory.provider';


@Module({
  imports: [DatabaseModule],
  providers: [
    ...productProvider,
    ...productCategoryProvider,
    ProductsService
  ],
  controllers: [ProductsController],
  exports: [],
})
export class ProductsModule { }
