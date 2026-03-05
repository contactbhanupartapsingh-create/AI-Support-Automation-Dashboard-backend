import { UserRoles } from 'src/static';
export declare class UserResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRoles;
    password?: string;
}
