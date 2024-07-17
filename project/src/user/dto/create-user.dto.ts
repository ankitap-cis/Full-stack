import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    IsStrongPassword
  } from 'class-validator';
// import { Role } from 'src/roles/enum';
  
  
  
  export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;
    
  
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric()
    username: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsInt()
    age: number;
  
    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;


    role: string;

    
  }