import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Post()
  async createUser(@Body() user: UserCreateDto): Promise<string | UserResponseDto>  {
    return await this.userService.createUser(user);
  }

  @UseGuards(AuthGuard) 
  @Get()
  async getUser(@Body('email') email: string): Promise<string | UserResponseDto> {
    return this.userService.getUser(email);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.getAllUsers();
  }

}
