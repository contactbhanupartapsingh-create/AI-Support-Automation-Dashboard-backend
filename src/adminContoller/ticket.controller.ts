import { Controller, Delete, Get, HttpException, Patch, Query, UseGuards } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { TicketDecorator } from "src/decorators/ticket.decorator";
import { TicketDeleteAdminDto } from "src/dto/ticketDeleteAdmin.dto";
import { TicketRestoreDto } from "src/dto/ticketRestore.dto";
import { Ticket } from "src/entity/ticket.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { TicketService } from "src/services/ticket.service";
import { HttpStatus, UserRoles } from "src/static";

@Controller('/admin/ticket')
@UseGuards(AuthGuard, RoleGuard)
@Roles(UserRoles.ADMIN)
export class AdminTicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get('all')
  async getAllTickets(@Query('getDeleted') getDeleted : boolean): Promise<Ticket[]> {
    try {
      return await this.ticketService.getAllTickets(getDeleted)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete')
  async deleteTicket(@TicketDecorator('body') deleteData: TicketDeleteAdminDto): Promise<Ticket> {
    try {
      return await this.ticketService.deleteTicketByAdmin(deleteData)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('restore')
  async restoreTicket(@TicketDecorator('body') restoreData: TicketRestoreDto): Promise<Ticket | null> {
    try {
      return await this.ticketService.restoreTicket(restoreData.id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
