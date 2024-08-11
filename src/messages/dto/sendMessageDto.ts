import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    example: 'deepCompany25',
    description: 'The sender of the message username',
  })
  @IsNotEmpty()
  @IsString()
  sender: string = '';

  @ApiProperty({
    example: 'mois2202',
    description: 'The receiver of the message username',
  })
  @IsNotEmpty()
  @IsString()
  receiver: string = '';

  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'The content of the message',
  })
  @IsNotEmpty()
  @IsString()
  content: string = '';
}
