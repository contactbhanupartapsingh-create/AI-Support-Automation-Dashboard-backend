import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { UserService } from 'src/services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(email: string, password: string): Promise<string | UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    createUser(userCreateDto: UserCreateDto): Promise<string | UserResponseDto>;
}
