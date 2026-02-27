import { Ticket } from 'src/entity/ticket.entity';
import { TicketService } from 'src/services/ticket.service';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getAllTickets(req: any): Promise<Ticket[]>;
}
