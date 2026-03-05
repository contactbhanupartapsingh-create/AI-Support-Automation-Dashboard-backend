import { IsNumber, Max, Min} from "class-validator";

export class PaginationQueryDto {
    @IsNumber()
    page: number

    @IsNumber()
    @Min(1)
    @Max(20)
    limit: number;

    @IsNumber()
    skip: number
}