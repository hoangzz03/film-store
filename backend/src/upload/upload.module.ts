import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule { }
