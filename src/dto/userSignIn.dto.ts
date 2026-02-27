import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isInt, IsNumber, isNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}