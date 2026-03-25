import { UsersModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    PassportModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      // Dùng fallback cho dev để tránh crash khi chưa set env.
      // Bạn nên set TOKEN trong .env ở môi trường thật.
      secret: process.env.TOKEN,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
