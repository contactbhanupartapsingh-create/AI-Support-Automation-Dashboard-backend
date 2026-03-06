import { Transform } from "class-transformer";
import { IsArray, IsEnum } from "class-validator";
import { TicketStatus } from "src/common/enums";

export class FilterQueryDto {
    @IsEnum(TicketStatus)
    @IsArray()
    status: TicketStatus[]

    @Transform(({value}) => value ?? false)
    getDeleted: boolean
}