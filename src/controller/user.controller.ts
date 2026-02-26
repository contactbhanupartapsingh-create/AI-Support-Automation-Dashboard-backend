import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { get } from 'http';
import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/services/user.service';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
) {}

  @Get()
  async getUser(email: string, password: string): Promise<string | UserResponseDto> {
    return this.userService.getUser(email, password);
  }

  @Get('all')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(userCreateDto: UserCreateDto): Promise<string | UserResponseDto>  {
    return this.userService.createUser(userCreateDto);
  }
}
