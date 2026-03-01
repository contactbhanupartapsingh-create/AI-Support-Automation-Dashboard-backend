import { TicketStatus } from "src/static";
export declare class TicketCreateDto {
    title: string;
    description: string;
    status?: TicketStatus;
}
