import { Controller, Delete, Get, HttpException, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { Filters } from "src/decorators/filters.decorator";
import { Pagination } from "src/decorators/pagination.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { TicketDecorator } from "src/decorators/ticket.decorator";
import { FilterQueryDto } from "src/dto/filterQuery.dto";
import { TicketResponseDto } from "src/dto/getTicketResponse.dto";
import { PaginationQueryDto } from "src/dto/paginationQuery.dto";
import { TicketDeleteAdminDto } from "src/dto/ticketDeleteAdmin.dto";
import { Ticket } from "src/entity/ticket.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { TicketService } from "src/services/ticket.service";
import { HttpStatus, UserRoles } from "src/common/enums";
import { Sort } from "src/decorators/sort.decorator";
import { SortQueryDto } from "src/dto/sortQuery.dto";

@Controller('/admin/ticket')
@UseGuards(AuthGuard, RoleGuard)
@Roles(UserRoles.ADMIN)
export class AdminTicketController {
  constructor(
    private readonly ticketService: TicketService
  ) { }

  @Get()
  async getAllTickets(
    @Filters() filters: FilterQueryDto, 
    @Pagination() paginationQuery : PaginationQueryDto,
    @Sort() sortFilters: SortQueryDto
  ): Promise<TicketResponseDto> {
    try {
      return await this.ticketService.getAllTickets(
        filters, 
        paginationQuery, 
        sortFilters
      )
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTicket(
    @Param('id') ticketId: number,
    @TicketDecorator('body') deleteData: TicketDeleteAdminDto
  ): Promise<Ticket> {
    try {
      return await this.ticketService.deleteTicketByAdmin(deleteData, ticketId)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/restore')
  async restoreTicket(
    @Param('id') ticketId: number
  ): Promise<Ticket | null> {
    try {
      return await this.ticketService.restoreTicket(ticketId)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
