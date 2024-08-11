import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel : Model<UserDocument>) {  
  }

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.UserModel.create(createUserDto);
    return createdUser;
  }

  async findAll() {
    return await this.UserModel.find();
  }

  async findOne(id: number) {
    return await this.UserModel.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.UserModel.findByIdAndUpdate;
  }

  async remove(id: number) {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
