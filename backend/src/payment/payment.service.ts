import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<Payment>,
  ) {}
   async findAll() {
    return await this.paymentRepository.find({ relations: ['user'] });
  }

  getPaymentById(id: number) {
    const payment = this.paymentRepository.findOne({ where: { id: id }, relations: ['user'] });
    if (!payment) throw new NotFoundException('Payment Not Found')
    return payment
  }
  async create(createPaymentDto: CreatePaymentDto) {
    const newPayment = {
      ...createPaymentDto,
    }
    await this.paymentRepository.save(newPayment)
    return newPayment
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.getPaymentById(id)
    if (!payment) {
      throw new NotFoundException('Payment Not Found');
    }
    const updatePayment = {
      ...updatePaymentDto,
    };
    await this.paymentRepository.update(id, updatePayment);
    return payment;
  }

  async delete(id: number) {
    const payment =  await this.getPaymentById(id)
    if (!payment) {
      throw new NotFoundException('Payment Not Found');
    }
    await this.paymentRepository.delete(id);
    return payment;
  }
}
