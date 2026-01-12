import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { OrderDetail } from './entities/order_detail.entity';
@Injectable()
export class OrderDetailService {
  constructor(
    @Inject('ORDER_DETAIL_REPOSITORY')
    private orderDetailRepository: Repository<OrderDetail>,
  ) { }
  async findAll() {
    return await this.orderDetailRepository.find({ relations: ['user', 'product'] });
  }

  async getOrderDetailById(id: number) {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id: id }, relations: ['user', 'product'] });
    if (!orderDetail) throw new NotFoundException('OrderDetail Not Found')
    return orderDetail
  }

  async getOrderDetailByUserId(id: number) {
    const orderDetail = await this.orderDetailRepository.find({ where: { user: { id: id } }, relations: ['user', 'product'] });
    if (!orderDetail) throw new NotFoundException('OrderDetail Not Found')
    return orderDetail
  }

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    const newOrderDetail = {
      ...createOrderDetailDto,
    }
    await this.orderDetailRepository.save(newOrderDetail)
    return newOrderDetail
  }
  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    const orderDetail = await this.getOrderDetailById(id);
    if (!orderDetail) {
      throw new NotFoundException('OrderDetail Not Found')
    }
    const updateOrderDetail = {
      ...updateOrderDetailDto,
    };
    await this.orderDetailRepository.update(id, updateOrderDetail);
    return orderDetail;
  }

  async delete(id: number) {
    const orderDetail = await this.getOrderDetailById(id);
    if (!orderDetail) {
      throw new NotFoundException('OrderDetail Not Found');
    }
    await this.orderDetailRepository.delete(id);
    return orderDetail;
  }

  async addQuantity(id: number) {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id: id } });
    if (!orderDetail) {
      throw new NotFoundException('orderDetail not found');
    }
    orderDetail.quantity += 1;
    await this.orderDetailRepository.save(orderDetail);
    return orderDetail;
  }

  async removeQuantity(id: number) {
    const orderDetail = await this.orderDetailRepository.findOne({ where: { id: id } });
    if (!orderDetail) {
      throw new NotFoundException('orderDetail not found');
    }
    orderDetail.quantity -= 1;
    await this.orderDetailRepository.save(orderDetail);
    return orderDetail;
  }


}
