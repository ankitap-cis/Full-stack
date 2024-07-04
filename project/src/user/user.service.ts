import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  
  createUser(createUserDto: CreateUserDto): Promise<Users> {
    const user: Users= new Users();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  
  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }

  
  viewUser(id: number): Promise<Users >{
    return this.userRepository.findOneBy({ id });
  }

  
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user: Users = new Users();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    user.gender=updateUserDto.gender;
    return this.userRepository.save(user);
  }

  
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}

