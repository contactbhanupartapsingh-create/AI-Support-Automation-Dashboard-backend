import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // }
  ],
  exports: [UserService],
})
export class UserModule {}