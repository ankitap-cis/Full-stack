import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {MailerService} from '../mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users) 
    private readonly userRepository: Repository<Users>,
    private readonly jwtService:JwtService,
    private readonly mailerService: MailerService,
                             
  ) { }


  async createUser(createUserDto: CreateUserDto) {
    const newUser: Users = this.userRepository.create(createUserDto);
    const savedUser: Users = await this.userRepository.save(newUser);
    // console.log(newUser);
    const { password, ...result } = savedUser;
    return { message: "User created successfully" }
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    // console.log("🚀 ~ UserService ~ findOne ~ user:", user)
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { username } });
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


  async removeUser(id: string): Promise<{ affected?: number }> {
    const getId = this.findOne(id);
    console.log(getId);
    return this.userRepository.delete(id);
  }
  
  async validateUserByJwt(payload: JwtPayload): Promise<Users | null>{
     const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    const userExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verificationToken = this.jwtService.sign({ email: createUserDto.email });

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    await this.userRepository.save(user);
    await this.mailerService.sendVerificationEmail(user.email, verificationToken);
  }

  async verifyEmail(token: string): Promise<Users> {
    const { email } = this.jwtService.verify(token);
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.verificationToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    user.isVerified = true;
    user.verificationToken = null;

    await this.userRepository.save(user);

    return user;
  }
}

