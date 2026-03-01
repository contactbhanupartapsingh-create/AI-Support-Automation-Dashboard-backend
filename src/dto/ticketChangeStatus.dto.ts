import { IsEnum, IsNotEmpty, IsNumber} from "class-validator";
import { TicketStatus } from "src/static";

export class TicketChangeStatusDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsNotEmpty()
    @IsEnum(TicketStatus)
    status: TicketStatus;
}