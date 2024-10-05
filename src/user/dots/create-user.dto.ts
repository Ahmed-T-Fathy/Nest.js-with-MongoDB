import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsEmail()
  email: String;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}
