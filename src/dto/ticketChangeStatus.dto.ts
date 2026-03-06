import { IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { TicketStatus } from "src/common/enums";
export class TicketChangeStatusDto {
    @IsNotEmpty()
    @IsEnum(TicketStatus)
    status: TicketStatus;
}