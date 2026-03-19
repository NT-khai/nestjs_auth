import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class createUserDto {
  @IsString()
  ten: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  tendangnhap: string;

  @IsString()
  @MinLength(8)
  matkhau: string;

  @IsString()
  @MinLength(8)
  nhaclaimatkhau: string;
}
