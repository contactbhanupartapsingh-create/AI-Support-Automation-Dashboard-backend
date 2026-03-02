import { UserRoles } from 'src/static';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';
export declare class TicketService {
    private ticketRepository;
    getAllTicketsByUser(user: User): Promise<Ticket[]>;
    createTicketForUser(user: User, ticketData: TicketCreateDto): Promise<Ticket>;
    changeTicketStatus(userId: number, ticketData: TicketChangeStatusDto): Promise<Ticket>;
    deleteTicket(userId: number, role: UserRoles, ticketDeleteData: TicketDeleteDto): Promise<Ticket>;
    restoreTicket(ticketId: number): Promise<Ticket | null>;
}
