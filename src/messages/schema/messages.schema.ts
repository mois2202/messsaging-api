import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: String, required: true, default: () => new Types.ObjectId() })
  _id: string = new Types.ObjectId().toHexString();;

  @Prop({ required: true})
  sender: string = '';

  @Prop({ required: true})
  receiver: string = '';

  @Prop({ required: true })
  content: string = '';

  @Prop({ default: false })
  isRead: boolean = false;

  @Prop({ default: false })
  isStarred: boolean = false;

  @Prop({ default: () => new Date()})
  timestamp: Date = new Date();
}

export const MessageSchema = SchemaFactory.createForClass(Message);
