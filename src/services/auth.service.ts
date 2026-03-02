import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { HttpStatus } from 'src/static';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( 
      private userService: UserService,
      private jwtService: JwtService
    ) {}
  

  async logIn(user : UserSignInDto): Promise<{accessToken: string}> {
    return await this.userService.getOneUser(user.email).then(async (data) => {
      if (typeof data === 'string' || !data) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND); 
      }
      if(user.password === data.password){
        const accessToken = await this.jwtService.signAsync({...data});
        return { accessToken };

      }
      //   return 'Login successful';
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED); 
    }).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR); 
    })
  }
}
