import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { OrderDetail } from 'src/order_detail/entities/order_detail.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 255, default: 'https://i.imgur.com/1JenGRR.jpeg' })
  avatar: string;


  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createat: Date;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @OneToMany(() => OrderDetail, orderDetails => orderDetails.user)
  orderDetails: OrderDetail[];

  @OneToMany(() => Payment, payment => payment.user)
  payments: Payment[];
}