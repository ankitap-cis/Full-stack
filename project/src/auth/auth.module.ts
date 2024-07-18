import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { Users } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { UserService } from 'src/user/user.service';
import { MailerService } from 'src/mailer/mailer.service';
import { MailerModule } from 'src/mailer/mailer.module';


@Module({
  imports: [UserModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1500s'},
    }),
    MailerModule
  ],
  providers: [AuthService,UserService, MailerService],
  controllers: [AuthController],
  exports:[AuthService, MailerService],
})
export class AuthModule {}