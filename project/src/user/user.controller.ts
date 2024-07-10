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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Roles } from 'src/roles/decorator';
import { Role } from 'src/roles/enum';
import { Users } from './entities/user.entity';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('/register')
  //@UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @UseGuards(AuthGuard)
  @Get('/getuser')
  @Roles(Role.Admin)
  async findAll() {
    return this.userService.findAllUser();
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.viewUser(id);
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  //@Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.removeUser(+id);
  }
}

function RequirePermissions(CREATE_USER: any): (target: UserController, propertyKey: "create", descriptor: TypedPropertyDescriptor<(createUserDto: CreateUserDto) => Promise<{ message: string; }>>) => void | TypedPropertyDescriptor<any> {
  throw new Error('Function not implemented.');
}
