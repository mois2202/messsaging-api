import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDocument, User } from 'src/users/schema/users.schema';
import { RegisterAuthDto } from './dto/RegisterAuthDto';
import { hash, compare } from 'bcryptjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginAuthDto } from './dto/LoginAuthDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel : Model<UserDocument>,
  private JwtService:JwtService ) {}

  async register(userDTO: RegisterAuthDto) {

    const { password } = userDTO;

    if (password) {
      const textToHash = await hash(password, 10);
      userDTO = {...userDTO, password: textToHash};
    }
    return this.userModel.create(userDTO);
    
  }


  async login(userDTO: LoginAuthDto) {

    const { email, password} = userDTO;

    const findUser = await this.userModel.findOne({email});

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);  
    }

    const comparePassword = await compare(password, findUser.password);
  
    if (!comparePassword) {
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: findUser._id, email: findUser.email, username: findUser.username };

    const token = await this.JwtService.sign(payload);

    const data = {
      user: findUser,
      token
    };
    return data;
  }
}
