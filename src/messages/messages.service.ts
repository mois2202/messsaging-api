import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/sendMessageDto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schema/messages.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private MessageModel : Model<MessageDocument>) {
  }

  saveMessage(sendMessageDto: SendMessageDto) {
    const createdMessage = new this.MessageModel(sendMessageDto);
    return createdMessage.save();
  }

  async findAll() {
    return await this.MessageModel.find().exec();
  }

  async findOne(id: number) {
    let message = await this.MessageModel.findById(id).exec();
    if(!message) {
      throw new HttpException('El mensaje no existe', HttpStatus.FORBIDDEN)
    }
    return message;
  }

  async markAsRead(id: number) {
    let messageRead = await this.MessageModel.findById(id).exec();
    if(!messageRead) {
      throw new HttpException('El mensaje no existe', HttpStatus.FORBIDDEN)
    }
    messageRead.isRead = true;
    return messageRead.save();
  }

  async markWithAsStar(id: number, updateMessageDto: UpdateMessageDto) {
    let messageStarred = await this.MessageModel.findById(id).exec();

    if(!messageStarred) {
      throw new HttpException('El mensaje no existe', HttpStatus.FORBIDDEN)
    }
    messageStarred.isStarred = true;
    return messageStarred.save();
  }

  async remove(id: number) {
    return await this.MessageModel.findByIdAndDelete(id).exec();
  }

  async findReadMessages() {
    let readMessages = await this.MessageModel.find({isRead: true}).exec();
    if(!readMessages) {
      throw new HttpException('No hay mensajes leidos', HttpStatus.FORBIDDEN)
    }
    return readMessages;
  }

  async findAllStarred() {
    let starredMessages = await this.MessageModel.find({isStarred: true}).exec();
    if(!starredMessages) {
      throw new HttpException('No hay mensajes marcados con estrella', HttpStatus.FORBIDDEN)
    }
    return starredMessages;
  }
}
