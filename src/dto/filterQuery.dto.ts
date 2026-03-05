import { Transform } from "class-transformer";
import { IsEnum } from "class-validator";
import { TicketStatus } from "src/static";

export class FilterQueryDto {
    @IsEnum(TicketStatus)
    status: TicketStatus

    @Transform(({value}) => value ?? false)
    getDeleted: boolean
}