import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 👇 Login: dùng LocalStrategy
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    console.log(req);
    console.log(process.env.TOKEN);
    // req.user được gắn bởi LocalStrategy.validate()
    const result = await this.authService.login(req.user);
    console.log('123123');
    console.log(result.access_token); // 👈 kiểm tra token

    return result;
  }

  // 👇 Register: tạo user mới
  @Post('register')
  async register(@Body() createUserDto: createUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // chính là object return từ JwtStrategy.validate()
  }
}
