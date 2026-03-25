import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'tendangnhap',
      passwordField: 'matkhau',
    });
  }

  async validate(tendangnhap: string, matkhau: string) {
    const userX = await this.authService.validateUser(tendangnhap, matkhau);
    if (userX) {
      return userX;
    }
    throw new UnauthorizedException();
  }
}
