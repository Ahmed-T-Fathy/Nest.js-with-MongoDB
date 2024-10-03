import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dots/create-user.dto';
import { GetAllUsersDTO } from './dots/get-all-users.dto';
import { APIresponse } from 'src/helpers/api-response';
import { Request } from 'express';
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
  async getAllUsers(data: GetAllUsersDTO, req: Request): Promise<APIresponse> {
    try {
      console.log("here");
      
      let filterBy: any = {};
      if (data.email) {
        filterBy.email = { $regex: data.email, options: 'i' };
      }
      if (data.name) {
        filterBy.name = { $regex: data.name, options: 'i' };
      }
      if (data.phoneNumber) {
        filterBy.phoneNumber = { $regex: data.phoneNumber, options: 'i' };
      }
      if (data.role) {
        filterBy.role = data.role;
      }

      let totalCount: number = await this.userModel.countDocuments(filterBy);
      const skip = (data.page - 1) * data.limit;
      let pageCount: number = Math.round(totalCount / data.limit);

      console.log(data.orderBy);
      const orderBy = data.orderBy || {};

      const users = await this.userModel
        .find({ ...filterBy })
        .sort(orderBy as any)
        .skip(skip)
        .limit(data.limit);
      return new APIresponse(
        users,
        data.page,
        data.limit,
        pageCount,
        totalCount,
        req,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
