import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const { username, email, password, address, phone } = createUserDto;

    const existingUserCount = await this.authRepository.count({
      where: [{ username }, { email }],
    });
    if (existingUserCount > 0) {
      return { message: 'Username hoặc Email đã tồn tại!' };
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return { message: 'Lỗi khi mã hóa mật khẩu!' };
    }

    const user = this.authRepository.create({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    await this.authRepository.save(user);
    return { message: 'Đăng ký thành công!' };
    // try {
    //     await this.sendVerificationEmail(email, token);
    //     return { message: 'Đăng ký thành công! Vui lòng kiểm tra email.' };
    // } catch (error) {
    //     console.error('Lỗi khi gửi email:', error);
    //     return { message: 'Đăng ký thành công nhưng không thể gửi email xác nhận. Vui lòng thử lại sau!' };
    // }
  }

  // async sendVerificationEmail(email: string, token: string) {
  //   // const transporter = nodemailer.createTransport({
  //   //   host: process.env.EMAIL_HOST,
  //   //   secure: false,
  //   //   port: process.env.EMAIL_PORT,
  //   //   auth: {
  //   //     user: process.env.EMAIL_USER,
  //   //     pass: process.env.EMAIL_PASS,
  //   //   },
  //   // });

  //   const link = `http://localhost:8888/auth/verify/${token}`;

  //   try {
  //     await transporter.sendMail({
  //       from: "bc536379f6b276@inbox.mailtrap.io",
  //       to: email,
  //       subject: 'Xác nhận tài khoản',
  //       html: `<p>Nhấn vào link sau để xác nhận tài khoản:</p> <a href="${link}">${link}</a>`,
  //     });
  //   } catch (error) {
  //     console.error('Lỗi gửi email:', error);
  //     throw new Error('Không thể gửi email xác nhận.');
  //   }
  // }

  async verifyEmail(token: string) {
    try {
      const { email } = this.jwtService.verify(token);
      const user = await this.authRepository.findOne({ where: { email } });

      if (!user) return { message: 'Token không hợp lệ!' };
      await this.authRepository.save(user);

      return { message: 'Tài khoản đã được xác nhận!' };
    } catch (error) {
      return { message: 'Token hết hạn hoặc không hợp lệ!' };
    }
  }

  async login(updateUserDto: UpdateUserDto, response: Response) {
    const { email, password } = updateUserDto;

    const user = await this.authRepository.findOne({
      where: [{ email: email }],
      relations: ["role", 'orderDetails'],
    });
    // console.log(user);

    if (!user) {
      return { message: 'Tài khoản không tồn tại!' };
    }

    if (!password) {
      return { message: 'Khong co mat khau' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: 'Mật khẩu không chính xác!' };
    }

    const { password: _, ...userData } = user;
    const token = this.jwtService.sign(userData, { expiresIn: '1h' });

    response.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
      path: '/'
    });

    return {
      message: 'Đăng nhập thành công!',
      user: user,
    };
  }

  async checkLogin(request: Request & { cookies: any }) {
    // console.log(request);
    console.log('Cookies:', request.cookies);
    const token = request.cookies?.auth_token;
    console.log('Token:', token);
    if (!token) {
      return { isAuthenticated: false, message: 'Người dùng chưa đăng nhập!' };
    }

    try {
      const userData = this.jwtService.verify(token);
      return { isAuthenticated: true, user: userData };
    } catch (error) {
      return { isAuthenticated: false, message: 'Token không hợp lệ hoặc đã hết hạn!' };
    }
  }

  async logout(response: Response) {
    response.clearCookie('auth_token', { path: '/' });
    response.status(200).json({ message: 'Đăng xuất thành công!' });
  }
}
