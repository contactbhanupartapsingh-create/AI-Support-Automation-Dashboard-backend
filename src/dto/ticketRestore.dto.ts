import { IsNotEmpty, IsNumber} from "class-validator";

export class TicketRestoreDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
    