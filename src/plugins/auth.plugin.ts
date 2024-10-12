import { Schema } from 'mongoose';
import { User } from 'src/user/user.schema';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;
interface UserUpdate {
  password?: string; // Include other fields if needed
}

export const authPlugin = (schema: Schema) => {
  const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
  };

  schema.pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = hashPassword(this.password);
    }
    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as UserUpdate; 
    if (update.password) {
      update.password = hashPassword(update.password); 
    }
    next();
  });

  schema.methods.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
  };

  schema.methods.generateToken=async function () {
    const payload={id:this._id}
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRESIN;
    return await jwt.sign(payload, secret, { expiresIn});
  }
};
