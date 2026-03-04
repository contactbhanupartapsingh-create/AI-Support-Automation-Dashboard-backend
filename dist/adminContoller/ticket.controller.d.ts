import { TicketDeleteAdminDto } from "src/dto/ticketDeleteAdmin.dto";
import { TicketRestoreDto } from "src/dto/ticketRestore.dto";
import { Ticket } from "src/entity/ticket.entity";
import { TicketService } from "src/services/ticket.service";
export declare class AdminTicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    getAllTickets(getDeleted: boolean): Promise<Ticket[]>;
    deleteTicket(deleteData: TicketDeleteAdminDto): Promise<Ticket>;
    restoreTicket(restoreData: TicketRestoreDto): Promise<Ticket | null>;
}
