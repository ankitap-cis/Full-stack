import { Body, Controller, Post,Get, HttpCode, HttpStatus, UseGuards, Request, Injectable} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/auth.dto';
import { AuthGuard } from '../auth/auth-guard';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() loginUserDto:LoginUserDto) {
    return this.authService.signIn(loginUserDto.username, loginUserDto.password);
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}