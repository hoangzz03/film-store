import { DataSource } from "typeorm";
import { User } from "src/users/entities/user.entity";

export const authProvider = [
    {
        provide: 'AUTH_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATA_SOURCE'],
    }
];