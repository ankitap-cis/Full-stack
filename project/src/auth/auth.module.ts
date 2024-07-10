import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { Users } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth-guard';


@Module({
  imports: [UserModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1500s'},
    }),
  ],
  providers: [AuthService,
  ],
  controllers: [AuthController],
  exports:[AuthService],
})
export class AuthModule {}