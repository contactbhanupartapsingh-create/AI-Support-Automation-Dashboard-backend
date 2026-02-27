import { Ticket } from './ticket.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    tickets: Ticket[];
}
