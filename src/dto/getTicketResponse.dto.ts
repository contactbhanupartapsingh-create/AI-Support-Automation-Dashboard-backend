import { Ticket } from "src/entity/ticket.entity";
import { PaginationMeta } from "src/common/types";

export class TicketResponseDto {
    tickets: Ticket[]

    meta: PaginationMeta
}