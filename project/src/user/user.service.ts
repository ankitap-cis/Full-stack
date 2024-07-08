import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    const newUser: Users = this.userRepository.create(createUserDto);
    const savedUser: Users = await this.userRepository.save(newUser);
    const { password, ...result } = savedUser;
    return { message: "User created successfully" }
  }

async findOne(id: string): Promise<Users> {
  const user = await this.userRepository.findOneBy( {id} );
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}

async findOneByUsername(username: string): Promise<Users> {
  const user = await this.userRepository.findOne({where:{username}});
  if (!user) {
    throw new NotFoundException(`User with username ${username} not found`);
  }
  return user;
}


  findAllUser(): Promise<Users[]> {
    return this.userRepository.find();
  }


  viewUser(id: string): Promise<Users> {
    return this.userRepository.findOneBy({ id });
  }

  viewUserByName(username: string): Promise<Users> {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }



  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}

