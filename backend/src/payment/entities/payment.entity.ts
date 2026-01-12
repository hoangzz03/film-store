import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderId: string;

    @Column()
    amount: number;

    @Column()
    message: string;

    @Column()
    payUrl: string;

    @Column()
    resultCode: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createat: Date;

    @ManyToOne(() => User, user => user.payments)
    user: User;

}
