import { IsEnum, IsOptional, IsString} from "class-validator";
import { TicketStatus } from "src/common/enums";

export class TicketUpdateDto {
    @IsOptional()
    @IsString()
    title?: string

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus
}
    