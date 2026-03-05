import { Ticket } from './ticket.entity';
import { UserRoles } from 'src/static';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoles;
    tickets: Ticket[];
}
