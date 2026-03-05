import { Controller, Delete, Get, HttpException, Patch, Query, UseGuards } from "@nestjs/common";
import { Filters } from "src/decorators/filters.decorator";
import { Pagination } from "src/decorators/pagination.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { TicketDecorator } from "src/decorators/ticket.decorator";
import { FilterQueryDto } from "src/dto/filterQuery.dto";
import { TicketResponseDto } from "src/dto/getTicketResponse.dto";
import { PaginationQueryDto } from "src/dto/paginationQuery.dto";
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
  async getAllTickets(
    @Filters() filters: FilterQueryDto, 
    @Pagination() paginationQuery : PaginationQueryDto
  ): Promise<TicketResponseDto> {
    try {
      return await this.ticketService.getAllTickets(filters, paginationQuery)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete')
  async deleteTicket(
    @TicketDecorator('body') deleteData: TicketDeleteAdminDto
  ): Promise<Ticket> {
    try {
      return await this.ticketService.deleteTicketByAdmin(deleteData)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('restore')
  async restoreTicket(
    @TicketDecorator('body') restoreData: TicketRestoreDto
  ): Promise<Ticket | null> {
    try {
      return await this.ticketService.restoreTicket(restoreData.id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
