import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, default: () => new Types.ObjectId() })
  _id: string = new Types.ObjectId().toHexString();

  @Prop({ required: true, unique: true })
  username: string = '';

  @Prop({ required: true, unique: true })
  email: string = '';

  @Prop({ required: true })
  password: string = '';

}

export const UserSchema = SchemaFactory.createForClass(User);
