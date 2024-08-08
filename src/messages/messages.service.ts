// messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schema/message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

  async sendMessage(sender: string, receiver: string, content: string): Promise<Message> {
    const newMessage = new this.messageModel({ sender, receiver, content });
    return newMessage.save();
  }

  async getMessages(receiver: string, filter: any = {}): Promise<Message[]> {
    return this.messageModel.find({ receiver, ...filter }).exec();
  }

  async markAsRead(messageId: string): Promise<Message | null> {
    return this.messageModel.findByIdAndUpdate(messageId, { isRead: true }, { new: true }).exec();
  }

  async markAsStarred(messageId: string): Promise<Message | null> {
    return this.messageModel.findByIdAndUpdate(messageId, { isStarred: true }, { new: true }).exec();
  }
}
