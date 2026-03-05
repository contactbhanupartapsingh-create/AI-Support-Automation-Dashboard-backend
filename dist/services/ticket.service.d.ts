import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';
import { TicketDeleteAdminDto } from 'src/dto/ticketDeleteAdmin.dto';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';
import { TicketResponseDto } from 'src/dto/getTicketResponse.dto';
export declare class TicketService {
    private ticketRepository;
    getUserTickets(user: User, paginationQuery: any, getDeleted?: boolean): Promise<TicketResponseDto>;
    createTicketForUser(user: User, ticketData: TicketCreateDto): Promise<Ticket>;
    changeTicketStatus(userId: number, ticketData: TicketChangeStatusDto): Promise<Ticket>;
    deleteTicket(userId: number, ticketDeleteData: TicketDeleteDto): Promise<Ticket>;
    getAllTickets(getDeleted: boolean, paginationQuery: PaginationQueryDto): Promise<TicketResponseDto>;
    restoreTicket(ticketId: number): Promise<Ticket | null>;
    deleteTicketByAdmin(ticketDeleteData: TicketDeleteAdminDto): Promise<Ticket>;
}
