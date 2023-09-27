import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  userId: string;
  @Prop({ require: true })
  name: string;
  @Prop()
  age: number;
  @Prop()
  githubUser: string;
  @Prop(
    raw({
      cep: String,
      state: String,
      city: String,
      neighborhood: String,
      street: String,
      number: String,
      complement: String,
      logradouro: String,
      ibge: String,
      gia: String,
      ddd: String,
      siafi: String,
    }),
  )
  address: Record<string, any>;
  @Prop(
    raw({
      login: String,
      id: Number,
      avatar: String,
      url: String,
      repos: Array<Object>,
    }),
  )
  githubData: Record<string, any>;
}
export const UserSchema = SchemaFactory.createForClass(User);
