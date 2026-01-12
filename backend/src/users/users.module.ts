import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProvider } from '../provider/users.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...userProvider,
        UsersService],
    controllers: [UsersController],
    exports: [],
})
export class UsersModule { } 
