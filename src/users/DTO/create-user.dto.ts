import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({
    example: 'mois2202',
    description: 'The username of the user',
    minLength: 4,
    maxLength: 20,
  })
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  username: string = '';

  @ApiProperty({
    example: 'moises@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string  = '';

  @ApiProperty({
    example: 'securePassword123',
    description: 'The password of the user',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string = '';
}
