import { Module } from '@nestjs/common';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}