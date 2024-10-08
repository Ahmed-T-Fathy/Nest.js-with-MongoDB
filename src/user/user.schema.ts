import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ enum: Role, default: Role.user })
  role: Role;

  @Prop()
  password: string;

  validatePassword: Function;
  generateToken: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);
