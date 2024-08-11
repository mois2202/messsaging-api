import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { SendMessageDto } from './dto/sendMessageDto';

@ApiBearerAuth()
@ApiTags('messages')
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {

  }

  @Post()
  async createMessage(@Body() sendMessageDto: SendMessageDto) {
    return this.messagesService.saveMessage(sendMessageDto);
  }

  @Get()
  async findAll() {
    return await this.messagesService.findAll();
  }

  @Get('/starred/')
  async findOnlyStarred() {
    return await this.messagesService.findAllStarred();
  }

  @Get('/read/')
  async findOnlyRead() {
    return await this.messagesService.findReadMessages();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.messagesService.remove(+id);
  }
}
