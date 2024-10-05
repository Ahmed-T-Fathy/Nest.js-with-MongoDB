import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { UserLoginDTO } from './dtos/user-login.dto';
import { access } from 'fs';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async login(data: UserLoginDTO) {
    try {
      const user = await this.userModel.findOne({ email: data.email });
      if (!user) throw new NotFoundException('User not found!');

      if (!await user.validatePassword(data.password))
        throw new ForbiddenException('incorrect password!');
      return { accessToken: 'token' };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
