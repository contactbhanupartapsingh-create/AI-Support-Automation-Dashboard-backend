import { IsEnum, IsNotEmpty, IsNumber, IsOptional} from "class-validator";
import { deleteType } from "src/static";

export class TicketDeleteAdminDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsEnum(deleteType)
    @IsOptional()
    type: deleteType = deleteType.soft
}
    