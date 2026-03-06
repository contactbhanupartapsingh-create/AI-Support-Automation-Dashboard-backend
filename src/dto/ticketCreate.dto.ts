import { IsString, IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import { TicketStatus } from "src/common/enums";

export class TicketCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    description: string;
  
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;
}