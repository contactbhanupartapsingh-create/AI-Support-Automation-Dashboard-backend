import { User } from './user.entity';
import { TicketStatus } from 'src/static';
export declare class Ticket {
    id: number;
    title: string;
    description: string;
    status: TicketStatus;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
