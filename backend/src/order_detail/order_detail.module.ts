import { Module } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { OrderDetailController } from './order_detail.controller';
import { orderDetailProvider } from 'src/provider/orderDetail.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OrderDetailService,
    ...orderDetailProvider,
    OrderDetailService
  ],
  controllers: [OrderDetailController],
  exports: [],
})
export class OrderDetailModule { }
