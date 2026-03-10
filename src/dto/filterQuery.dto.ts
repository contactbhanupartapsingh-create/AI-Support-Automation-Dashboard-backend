import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsOptional } from "class-validator";
import { TicketStatus } from "src/common/enums";

export class FilterQueryDto {
    @IsOptional()
    @IsEnum(TicketStatus)
    @IsArray()
    status: TicketStatus[]

    @IsOptional()
    @Transform(({value}) => value ?? false)
    getDeleted: boolean
}