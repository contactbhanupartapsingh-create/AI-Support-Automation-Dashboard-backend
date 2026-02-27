import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(user: UserCreateDto): Promise<string | UserResponseDto>;
    getUser(email: string): Promise<string | UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
}
