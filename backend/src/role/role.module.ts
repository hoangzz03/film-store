
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/database/database.module';
import { roleProvider } from 'src/provider/roles.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...roleProvider,
    RoleService],
  controllers: [RoleController],
  exports: [],
})
export class RoleModule { }
