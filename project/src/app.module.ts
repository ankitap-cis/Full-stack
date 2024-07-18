import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { Users } from './user/entities/user.entity';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './roles/role.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UserService } from './user/user.service';
import { MailerService } from './mailer/mailer.service';



@Module({
  imports: [
  TypeOrmModule.forFeature([Users]),
  TypeOrmModule.forRoot({
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username: 'myuser',
    password : 'mypass',
    database: "myuser",
    entities : [ Users ],
    synchronize: true,

  }),
  MailerModule,
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  UserModule,
  AuthModule,
  
  
  // PassportModule,
  
],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },  
    AppService,
    UserService,
  
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('users');
  }
}
