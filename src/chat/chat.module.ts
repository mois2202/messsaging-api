import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from '../messages/messages.module'; // Importa el módulo de mensajes

@Module({
  imports: [MessagesModule], // Añadir MessagesModule a la lista de imports
  providers: [ChatGateway],
})
export class ChatModule {}