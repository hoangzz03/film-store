import { Controller, Post, Body, Get, Param, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // @Get('verify/:token')
  // async verifyEmail(@Param('token') token: string) {
  //   return this.authService.verifyEmail(token);
  // }

  @Post('login')
  async login(
    @Body() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.authService.login(updateUserDto, response);
  }

  @Get('check-login')
  async checkLogin(@Req() request: Request & { cookies: any }) {
    return this.authService.checkLogin(request);
  }
  @Post('logout')
  async logout(@Res() response: Response) {
    return this.authService.logout(response);
  }
}
