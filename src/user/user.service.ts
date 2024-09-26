import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dots/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createUser(createObj: CreateUserDTO): Promise<User> {
    try {
      const newUser = new this.userModel(createObj);
      return await newUser.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
