import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { orderByTransformer } from 'src/transformers/orderby.transformer';
import { Role } from '../role.enum';

export class GetAllUsersDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  //   @Transform(({ obj }) => (obj.page - 1) * obj.limit, { toClassOnly: true })
  //   skip?: number;

  @IsOptional()
  @IsObject()  // Use IsObject here instead of string
  orderBy?: { [key: string]: number };  // Expecting an object directly

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: string;
}
