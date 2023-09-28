import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      console.error(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find();
    } catch (error) {
      console.error(error);
    }
  }
  async findOne(id: string): Promise<User> {
    try {
      return this.userModel.findOne({ userId: id });
    } catch (error) {
      console.error(error);
    }
  }
  async editing(editUserDto, id: string) {
    try {
      const updated = await this.userModel
        .findOneAndUpdate({ userId: id }, editUserDto)
        .exec();
      return updated;
    } catch (error) {
      console.error(error);
    }
  }
  async delete(id: string) {
    try {
      return await this.userModel.findOneAndDelete({ userId: id }).exec();
    } catch (error) {
      console.error(error);
    }
  }
}
