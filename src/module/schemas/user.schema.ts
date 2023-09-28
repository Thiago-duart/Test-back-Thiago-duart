import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AddressDto } from '../dto/Address.dto';
import { GithubDto } from '../dto/Github.dto';
import { UserDto } from '../dto/User.dto';
import { ValidateNested } from 'class-validator';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  userId: string;
  @Prop()
  name: string;
  @Prop()
  age: string;
  @Prop()
  githubUser: string;
  @Prop()
  address: AddressDto;
  @Prop()
  gitHubData: GithubDto;
}
export const UserSchema = SchemaFactory.createForClass(User);
