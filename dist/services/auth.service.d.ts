import { UserService } from './user.service';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    logIn(user: UserSignInDto): Promise<{
        accessToken: string;
    }>;
}
