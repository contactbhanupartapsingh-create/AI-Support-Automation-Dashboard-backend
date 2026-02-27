import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { AuthService } from 'src/services/auth.service';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    getUser(user: UserSignInDto): Promise<string>;
}
