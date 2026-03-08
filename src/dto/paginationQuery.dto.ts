import { Transform } from "class-transformer";
import { IsNumber, Max, Min} from "class-validator";

export class PaginationQueryDto {
    @IsNumber()
    @Transform(({value}) => value ?? 1)
    page: number

    @IsNumber()
    @Min(1)
    @Max(20)
    @Transform(({value}) => value ?? 10)
    limit: number;

    // calculated in pagination decorator so that user should not able to set value of skip
    skip: number
}