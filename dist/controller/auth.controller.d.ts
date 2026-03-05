import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
export declare class AuthController {
    private readonly AuthService;
    private readonly UserService;
    constructor(AuthService: AuthService, UserService: UserService);
    createUser(user: UserCreateDto): Promise<string | UserResponseDto>;
    getUser(user: UserSignInDto): Promise<string>;
}
