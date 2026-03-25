import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UsersMiddleware } from 'src/middleware/users.middleware';
@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsersMiddleware).forRoutes(UsersController);
  }
}
