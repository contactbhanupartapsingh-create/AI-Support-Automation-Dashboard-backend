import { IsEnum, IsOptional, IsString} from "class-validator";
import { TicketStatus } from "src/common/enums";
import { AtLeastOne } from "src/pipes/atLeastOneInBody.pipe";

@AtLeastOne()
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
    