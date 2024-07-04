import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  @UsePipes( new ValidationPipe({whitelist :true}))
  create(@Body('register') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  
  @Get()
  async findAll() {
    return this.userService.findAllUser();
  }

  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.viewUser(+id);
  }

  
  @Patch(':id')
  @UsePipes(new ValidationPipe({whitelist: true}))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.removeUser(+id);
  }
}