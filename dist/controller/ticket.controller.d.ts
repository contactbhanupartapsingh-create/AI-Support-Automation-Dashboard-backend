import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketService } from 'src/services/ticket.service';
import { UserRoles } from 'src/static';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';
import { TicketRestoreDto } from 'src/dto/ticketRestore.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getAllTickets(user: User): Promise<Ticket[]>;
    createTicket(user: User, ticketData: TicketCreateDto): Promise<Ticket>;
    changeStatus(userId: number, ticketData: TicketChangeStatusDto): Promise<Ticket>;
    deleteTicket(userData: {
        id: number;
        role: UserRoles;
    }, deleteData: TicketDeleteDto): Promise<Ticket>;
    restoreTicket(restoreData: TicketRestoreDto): Promise<Ticket | null>;
}
