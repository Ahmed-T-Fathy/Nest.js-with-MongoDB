import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserLoginDTO } from './dtos/user-login.dto';

@Controller('auth')
export class UserAuthController {
    constructor(private readonly userAuthService:UserAuthService){}

    @Post('/login')
    async login(@Body() data:UserLoginDTO){
        return this.userAuthService.login(data);
    }
}
