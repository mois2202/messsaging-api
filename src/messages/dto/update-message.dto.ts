import { PartialType } from '@nestjs/swagger';
import { SendMessageDto } from './sendMessageDto';

export class UpdateMessageDto extends PartialType(SendMessageDto) {}
