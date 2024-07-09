import { Controller, Injectable } from '@nestjs/common';
import {
    IsAlphanumeric,
    
    IsNotEmpty,
    
    MinLength,
    IsStrongPassword
  } from 'class-validator';
  
  
  export class LoginUserDto {
    
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric()
    username: string;
  
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
  }