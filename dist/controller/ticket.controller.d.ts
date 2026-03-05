import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketService } from 'src/services/ticket.service';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';
import { TicketResponseDto } from 'src/dto/getTicketResponse.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getUserTickets(user: User, paginationQuery: PaginationQueryDto): Promise<TicketResponseDto>;
    getTrashTicketsByUser(user: User, paginationQuery: PaginationQueryDto): Promise<TicketResponseDto>;
    createTicket(user: User, ticketData: TicketCreateDto): Promise<Ticket>;
    changeStatus(userId: number, ticketData: TicketChangeStatusDto): Promise<Ticket>;
    deleteTicket(userData: {
        id: number;
    }, deleteData: TicketDeleteDto): Promise<Ticket>;
}
