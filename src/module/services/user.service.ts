import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto) {
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ userId: id });
  }
  async editing(editUserDto, id: string) {
    const updated = await this.userModel
      .findOneAndUpdate({ userId: id }, editUserDto)
      .exec();
    return updated;
  }
  async delete(id: string) {
    return await this.userModel.findOneAndDelete({ userId: id }).exec();
  }
}
