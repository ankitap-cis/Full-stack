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
  MailerModule.forRoot({
    transport: {
      host: 'smtp.example.com',
      port: 587,
      auth: {
        user: 'user@example.com',
        pass: 'password',
      },
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
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
