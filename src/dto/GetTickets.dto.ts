import { Type } from "class-transformer";

export class GetTicketsDto {
    @Type(() => Boolean)
    getDeleted: boolean
}