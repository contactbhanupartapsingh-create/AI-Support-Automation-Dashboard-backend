import { UserCreateDto } from 'src/dto/userCreate.dto';
import { UserResponseDto } from 'src/dto/userResponse.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getUser(email: string, password: string): Promise<string | UserResponseDto>;
    getAllUsers(): Promise<UserResponseDto[]>;
    createUser(userCreateDto: UserCreateDto): Promise<string | UserResponseDto>;
}
