import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerService } from 'src/mailer/mailer.service';



@Module({
  imports: [TypeOrmModule.forFeature([Users]),MailerModule,
JwtModule.register({
  secret: 'your_jwt_secret',
  signOptions:{expiresIn:'1d'},
 
}),
],
  
  controllers: [UserController],
  providers: [UserService,MailerService]
  // exports: [UserService]
})
export class UserModule {}
