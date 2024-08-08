import { Controller } from '@nestjs/common';
import { Post, Body, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  async sendMessage(@Body() sendMessageDto: { sender: string; receiver: string; content: string }) {
    return this.messagesService.sendMessage(sendMessageDto.sender, sendMessageDto.receiver, sendMessageDto.content);
  }

  @Get(':receiver')
  async getMessages(@Param('receiver') receiver: string, @Query() query: any) {
    return this.messagesService.getMessages(receiver, query);
  }

  @Patch('read/:id')
  async markAsRead(@Param('id') messageId: string) {
    return this.messagesService.markAsRead(messageId);
  }

  @Patch('star/:id')
  async markAsStarred(@Param('id') messageId: string) {
    return this.messagesService.markAsStarred(messageId);
  }
}
