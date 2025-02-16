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
import { RolesGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth-guard';
import { VerifyEmailDto } from './dto/verify-email.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post('/register')
  //@UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }


  @Post('/registeruser')
  //@UsePipes(new ValidationPipe({ whitelist: true }))
 async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
   
 
  @Post('verify')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    const user = await this.userService.verifyEmail(verifyEmailDto.token);
    // Redirect to login page with user's data
    return { message: 'User verified', user };
  }



  @Get('/getuser')
  // @Roles('admin')
  async findAll() {
    return this.userService.findAllUser();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.viewUser(id);
  }

  @UseGuards(RolesGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

   @UseGuards(RolesGuard)
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    console.log(`User ${id} deleted`);
    return this.userService.removeUser(id);
  }

  

}


