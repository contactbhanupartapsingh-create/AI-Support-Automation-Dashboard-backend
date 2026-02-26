import { AuthService } from 'src/services/auth.service';
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    getUser(): string;
}
