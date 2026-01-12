import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { authProvider } from 'src/provider/auth.provider';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule,
    JwtModule.register({
      secret: "Viethoangcute",
      signOptions: { expiresIn: '1h' },
    })],
  controllers: [AuthController],
  providers: [
    ...authProvider,
    AuthService],
})
export class AuthModule { }
