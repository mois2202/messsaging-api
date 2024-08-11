import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { SendMessageDto } from '../messages/dto/sendMessageDto';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server = new Server();

  afterInit(server: any) {
    console.log('Inicio del socket!!');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conecto al socket');
  }

  handleDisconnect(client: any) {
    console.log('Alguien se desconecto del socket');
  }

  @SubscribeMessage('event_join')
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event_message')
  async handleIncommingMessage(
    client: Socket,
    payload: { room: string; message: string, sender: string, receiver: string },
  ) {
    const { room, message, sender, receiver } = payload;

    // Llamar al servicio para guardar el mensaje en la base de datos
    const sendMessageDto = new SendMessageDto();
    sendMessageDto.sender = sender;
    sendMessageDto.receiver = receiver;
    sendMessageDto.content = message;
    
    await this.messagesService.saveMessage(sendMessageDto);

    // Emitir el mensaje a todos los clientes en la sala específica
    this.server.to(`room_${room}`).emit('new_message', message);
  }

  @SubscribeMessage('event_leave')
  handleRoomLeave(client: Socket, room: string) {
    console.log(`chao room_${room}`)
    client.leave(`room_${room}`);
  }

  @SubscribeMessage('mark_as_read')
  async handleMarkAsRead(client: Socket, messageId: string) {
    await this.messagesService.markAsRead(parseInt(messageId, 10));
    this.server.to(client.id).emit('message_read', { messageId });
  }
}