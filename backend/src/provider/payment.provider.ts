import { Payment } from "src/payment/entities/payment.entity";
import { DataSource } from "typeorm";

export const paymentProvider = [
    {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Payment),
    inject: ['DATA_SOURCE'],
    },
]
