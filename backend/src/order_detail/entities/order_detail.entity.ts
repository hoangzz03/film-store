import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Payment } from 'src/payment/entities/payment.entity';
@Entity({ name: 'order_detail' })
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Product, product => product.orderDetails)
    product: Product;

    @ManyToOne(() => User, user => user.orderDetails)
    user: User;
}
