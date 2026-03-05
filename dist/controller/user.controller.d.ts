import { UserResponseDto } from 'src/dto/userResponse.dto';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(email: string): Promise<string | UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
}
