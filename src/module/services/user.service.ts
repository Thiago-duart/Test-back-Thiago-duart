import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { EditUserDto } from '../dto/editUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }
  async editing(editUserDto: EditUserDto, id: string) {
    const updated = await this.userModel
      .findByIdAndUpdate({ _id: id }, editUserDto)
      .exec();
    return updated;
  }
  async delete(id: string) {
    return await this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
