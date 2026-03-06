import { IsEnum, IsOptional} from "class-validator";
import { deleteType } from "src/common/enums";

export class TicketDeleteAdminDto {
    @IsEnum(deleteType)
    @IsOptional()
    type: deleteType = deleteType.soft
}
    