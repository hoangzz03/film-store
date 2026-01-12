import { DataSource } from "typeorm";
import { Inject } from "@nestjs/common";
import { OrderDetail } from "src/order_detail/entities/order_detail.entity";

export const orderDetailProvider = [
    {
        provide: 'ORDER_DETAIL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderDetail),
        inject: ['DATA_SOURCE'],
    },
];