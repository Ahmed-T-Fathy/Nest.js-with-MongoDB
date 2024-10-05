import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
    providers: [UserAuthService],
  controllers: [UserAuthController]
})
export class UserAuthModule {}
