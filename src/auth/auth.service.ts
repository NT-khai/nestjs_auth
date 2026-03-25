import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly userService: UsersService,
  ) {}

  // validatevalu
  async validateUser(Tendangnhap: string, matKhau: string) {
    const user = await this.userService.getOneUserBytenDangNhap(Tendangnhap);

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    // Không dùng bcrypt: so khớp mật khẩu trực tiếp.
    if (matKhau !== user.matkhau) return undefined;

    const { matkhau, tendangnhap, ngaytao, email, ...other } = user;
    return other;
  }

  async login(user: any) {
    const Payload = {
      sub: user.id,
      role: user.role,
      tendangnhap: user.tendangnhap,
    };

    return {
      access_token: this.jwtservice.sign(Payload),
      user,
    };
  }

  async register(createUserDto: createUserDto) {
    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await this.userService.getOneUserBytenDangNhap(
      createUserDto.tendangnhap,
    );
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    // Tạo user mới
    const newUser = await this.userService.createUser({
      ...createUserDto,
    });

    // Trả về thông tin user (ẩn mật khẩu)
    const { matkhau, ...result } = newUser;
    return result;
  }
}
