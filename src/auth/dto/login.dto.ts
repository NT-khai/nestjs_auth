import { IsString } from 'class-validator';
export class loginDto {
  @IsString()
  tendangnhap!: string;
  @IsString()
  matkhau!: string;
}
