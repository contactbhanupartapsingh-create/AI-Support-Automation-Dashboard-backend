import { Transform } from "class-transformer";
import { IsArray, isArray, IsEnum } from "class-validator";
import { TicketStatus } from "src/static";

export class FilterQueryDto {
    @IsEnum(TicketStatus)
    @IsArray()
    status: TicketStatus[]

    @Transform(({value}) => value ?? false)
    getDeleted: boolean
}