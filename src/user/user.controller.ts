import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(
    @Query('trang') trang?: string,
    @Query('soLuong') soLuong?: string,
  ) {
    // Nếu client không truyền trang/soLuong => trả full danh sách
    if (trang === undefined && soLuong === undefined) {
      return await this.userService.getAll();
    }

    const page = trang ? Number(trang) : 1;
    const limit = soLuong ? Number(soLuong) : 2;
    return await this.userService.getPhanTrang(page, limit);
  }

  @Get(':id')
  async xuatOneUser(@Param('id') id: string) {
    let data = await this.userService.getOneUser(Number(id));
    return data;
  }

  @Post()
  async createUser(@Body() Body: createUserDto) {
    return this.userService.createUser(Body);
  }

  @Patch(':id')
  async updateUser(@Body() Body: updateUserDto, @Param('id') id: string) {
    return await this.userService.updateUser(Number(id), Body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
