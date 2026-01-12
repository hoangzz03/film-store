import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order_detail.service';
import { CreateOrderDetailDto } from './dto/create-order_detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  getOrderDetailById(@Param('id') id: string) {
    return this.orderDetailService.getOrderDetailById(+id);
  }

  @Get('user/:id')
  getOrderDetailByUserId(@Param('id') id: string) {
    return this.orderDetailService.getOrderDetailByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderDetailService.delete(+id);
  }

  @Post('/add-quantity/:id')
  addQuantity(@Param('id') id: string,) {
    return this.orderDetailService.addQuantity(+id);
  }

  @Post('/remove-quantity/:id')
  removeQuantity(@Param('id') id: string,) {
    return this.orderDetailService.removeQuantity(+id);
  }
}
