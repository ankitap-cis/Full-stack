import {
    IsAlphanumeric,
    IsNotEmpty,
    MinLength,
    IsStrongPassword,
    IsEmail
  } from 'class-validator';
  
  
  export class LoginUserDto {
    // @IsEmail()
    //  email:string;
    
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric()
    username: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
  }