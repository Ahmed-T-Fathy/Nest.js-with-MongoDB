import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dots/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Post()
  async createUser(@Body() createObj: CreateUserDTO) {
    return await this.UserService.createUser(createObj);
  }
}
