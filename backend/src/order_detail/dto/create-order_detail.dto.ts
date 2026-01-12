import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { OrderDetail } from "../entities/order_detail.entity";
export class CreateOrderDetailDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    price: string;

}
