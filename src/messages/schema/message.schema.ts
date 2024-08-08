import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  _id: string = '';

  @Prop({ required: true })
  sender: string = '';

  @Prop({ required: true })
  receiver: string = '';

  @Prop({ required: true })
  content: string = '';

  @Prop({ default: false })
  isRead: boolean = false;

  @Prop({ default: false })
  isStarred: boolean = false;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
