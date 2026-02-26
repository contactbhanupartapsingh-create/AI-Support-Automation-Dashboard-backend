import { Controller, Get } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Get()
  getUser(): string {
    return this.AuthService.signIn();
  }
}
