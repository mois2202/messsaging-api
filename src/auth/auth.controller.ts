import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/LoginAuthDto';
import { RegisterAuthDto } from './dto/RegisterAuthDto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth-guard';
import { UseGuards } from '@nestjs/common';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userDTO: RegisterAuthDto) {
    return this.authService.register(userDTO);
  }

  @Post('login')
  loginUser(@Body() userDTO: LoginAuthDto) {
    return this.authService.login(userDTO);
  }
}
