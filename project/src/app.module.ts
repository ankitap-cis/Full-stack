import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Users } from './user/entities/user.entity';

@Module({
  imports: [
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
  UserModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
