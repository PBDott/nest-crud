import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepositroy: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const emailFound = await this.userRepositroy.findEmail(createUserDto.email);

    if(emailFound) throw new HttpException(`${createUserDto.email}`, 400);
    else return await this.userRepositroy.create(createUserDto);
  }

  async findOne(id: number) {
    const found = await this.userRepositroy.findOne(id);

    if(!found) throw new HttpException(`${id}`, 400);

    const { id: userId, password, ...result } = found;
    return found;
  }

  async update(updateUserDto: UpdateUserDto) {
    const idFound = await this.userRepositroy.findOne(updateUserDto.id);
    
    if(!idFound) throw new HttpException(`${updateUserDto.id}`, 400);

    const emailFound = await this.userRepositroy.findEmail(updateUserDto.email);

    if(!emailFound) throw new HttpException(`${updateUserDto.email}`, 400);

    return await this.userRepositroy.update(updateUserDto);
  }
}
