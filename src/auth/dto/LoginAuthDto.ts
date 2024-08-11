import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string = '';

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 20,
  })
  @MinLength(8)
  @MaxLength(20)
  password: string = '';
}
