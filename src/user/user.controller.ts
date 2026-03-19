import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller('Users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async xuatAll() {
    return await this.userService.getAll();
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
