import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
export declare class TicketService {
    private ticketRepository;
    getAllTicketsByUser(user: User): Promise<Ticket[]>;
}
