import { PartialType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './LoginAuthDto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({
    example: 'mois2202',
    description: 'The username of the user',
  })
  @IsNotEmpty()
  username: string = '';

}
