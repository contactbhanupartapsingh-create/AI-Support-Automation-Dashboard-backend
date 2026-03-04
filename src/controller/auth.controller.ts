import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly AuthService: AuthService,
    private readonly UserService: UserService
  ) { }

  @Post('register')
  async createUser(@Body() user: UserCreateDto): Promise<string | UserResponseDto> {
    return await this.UserService.createUser(user);
  }


  @Post('login')
  async getUser(@Body() user: UserSignInDto): Promise<string> {
    return this.AuthService.logIn(user).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    })
  }
}
