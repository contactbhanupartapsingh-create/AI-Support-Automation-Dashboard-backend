import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import { SortOrder, TicketSortFields } from "src/common/enums";

export class SortQueryDto {
    @IsOptional()
    @IsEnum(TicketSortFields)
    sortBy?: TicketSortFields

    @IsOptional()
    @IsEnum(SortOrder)
    @Transform(({value}) => value?.toUpperCase())
    order?: SortOrder
}