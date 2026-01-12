import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProvider } from 'src/provider/payment.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...paymentProvider,
    PaymentService,
  ],
  controllers: [PaymentController],
  exports: [],
})
export class PaymentModule {}
