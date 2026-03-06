import { IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { TicketStatus } from "src/static";

export class TicketChangeStatusDto {
    @IsNotEmpty()
    @IsEnum(TicketStatus)
    status: TicketStatus;
}