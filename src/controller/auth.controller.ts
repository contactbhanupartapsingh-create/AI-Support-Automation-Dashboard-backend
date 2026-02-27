import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async getUser( @Body() user: UserSignInDto): Promise<string> {
    return this.AuthService.logIn(user).then((response) => {
      return response;
    }).catch((error) => {
      return error;
    })
  }
}
