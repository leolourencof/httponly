import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  import { PartialType } from '@nestjs/mapped-types';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(320)
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(64)
    password: string;
  }
  
  export class UpdateUserDto extends PartialType(CreateUserDto) {}