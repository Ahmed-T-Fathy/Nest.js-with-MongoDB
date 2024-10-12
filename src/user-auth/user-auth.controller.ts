import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserLoginDTO } from './dtos/user-login.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { GetUserDTO } from './dtos/get-user.dto';
import { Request } from 'express';
import { AuthGaurd } from 'src/auth/guards/auth.guard';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('/login')
  async login(@Body() data: UserLoginDTO) {
    return this.userAuthService.login(data);
  }

  @Serialize(GetUserDTO)
  @UseGuards(AuthGaurd)
  @Get('/me')
  async me(@Req() req) {
    return await this.userAuthService.me(req);
  }
}
