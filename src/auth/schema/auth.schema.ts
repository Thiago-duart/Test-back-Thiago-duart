import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type authDocument = HydratedDocument<Auth>;
@Schema()
export class Auth {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}
export const AuthSchema = SchemaFactory.createForClass(Auth);
