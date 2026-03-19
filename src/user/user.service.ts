import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    let data = await this.prisma.users.findMany();
    return data.length > 0 ? data : null;
  }

  async getOneUser(id: number) {
    let user = await this.prisma.users.findMany({
      where: {
        id: id,
      },
    });

    if (user) {
      return user;
    }
    return undefined;
  }

  async createUser(user: createUserDto) {
    if (user.nhaclaimatkhau !== user.matkhau) {
      throw new BadRequestException({ message: 'Mat khau khong khop' });
    }
    let create_user = await this.prisma.users.create({
      data: {
        ten: user.ten,
        email: user.email,
        tendangnhap: user.tendangnhap,
        matkhau: user.matkhau,
      },
    });
    return create_user;
  }

  async updateUser(id: number, user: updateUserDto) {
    let findUserId = await this.prisma.users.findFirst({
      where: { id: id },
    });

    if (!findUserId) {
      throw new NotFoundException({ message: 'Không tìm thấy user' });
    }

    if (user.matkhau === user.nhaclaimatkhau) {
      let updatedUser = await this.prisma.users.update({
        where: { id: id },
        data: {
          ten: user.ten,
          matkhau: user.matkhau,
        },
      });
      return updatedUser;
    }

    return undefined;
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.users.delete({
        where: { id: id },
      });
      return user; // Prisma sẽ trả về bản ghi vừa bị xóa
    } catch (error) {
      throw new NotFoundException({ message: 'Không tìm thấy user để xóa' });
    }
  }
}
