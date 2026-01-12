import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { RoleModule } from './role/role.module';
import { ProductsModule } from './products/products.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { paymentProvider } from './provider/payment.provider';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UsersModule, ProductCategoryModule, RoleModule, ProductsModule, OrderDetailModule, PaymentModule, AuthModule, DatabaseModule, UploadModule, BlogModule],
  controllers: [AppController],
  providers: [
    ...paymentProvider,
    AppService],
})
export class AppModule { }
