import { Ticket } from "src/entity/ticket.entity";
import { PaginationMeta } from "src/static";
export declare class TicketResponseDto {
    tickets: Ticket[];
    meta: PaginationMeta;
}
