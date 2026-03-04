import { IsNotEmpty, IsNumber} from "class-validator";

export class TicketDeleteDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
    