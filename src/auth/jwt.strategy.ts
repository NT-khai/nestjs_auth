import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: (process.env.TOKEN?.trim() || 'dev-secret') as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      tendangnhap: payload.tendangnhap,
      role: payload.role,
    };
  }
}
