import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty()
    @IsString()
    name:String;

    @IsNotEmpty()
    @IsEmail()
    email:String;

    @IsOptional()
    @IsString()
    phoneNumber:string;
}