import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductCategory } from 'src/product_category/entities/product_category.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string; 

    @Column()
    image: string;

    @Column()
    desc: string;

    @Column()
    price: number;

    @Column()
    detail: string;

    @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
    productCategory: ProductCategory;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
    orderDetails: OrderDetail[];
}
