import { IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class updateUserDto {
  @IsString()
  @IsOptional()
  ten!: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  matkhau!: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  nhaclaimatkhau!: string;
}
