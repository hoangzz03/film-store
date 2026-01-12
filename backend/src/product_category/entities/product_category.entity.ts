import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
@Entity({ name: 'product_category' })
export class ProductCategory { 
    @PrimaryGeneratedColumn()
    id: number;  

    @Column()
    name: string;

    @OneToMany(() => Product, product => product.productCategory)
    products: Product[];
}

