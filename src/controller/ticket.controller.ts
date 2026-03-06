import { Controller, Delete, Get, HttpException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketService } from 'src/services/ticket.service';
import { HttpStatus, TicketStatus } from 'src/common/enums';
import { UserDecorator } from 'src/decorators/user.decorator';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { TicketDecorator } from 'src/decorators/ticket.decorator';
import { Pagination } from 'src/decorators/pagination.decorator';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';
import { TicketResponseDto } from 'src/dto/getTicketResponse.dto';
import { Filters } from 'src/decorators/filters.decorator';
import { FilterQueryDto } from 'src/dto/filterQuery.dto';
import { TicketUpdateDto } from 'src/dto/ticketUpdate.dto';
import { Sort } from 'src/decorators/sort.decorator';
import { SortQueryDto } from 'src/dto/sortQuery.dto';

@UseGuards(AuthGuard)
@Controller('/ticket')
export class TicketController {
    constructor(
      private readonly ticketService: TicketService
    ) {}

  @Get()
  async getUserTickets(
    @UserDecorator(['user']) user: User, 
    @Pagination() paginationQuery: PaginationQueryDto,
    @Filters() filters: FilterQueryDto,
    @Sort() sortFilters: SortQueryDto
  ): Promise<TicketResponseDto> {
    try {
        return await this.ticketService.getUserTickets(
          user, 
          paginationQuery, 
          filters, 
          sortFilters
        )
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('trash')
  async getTrashTicketsByUser(
    @UserDecorator(['user']) user: User, 
    @Pagination() paginationQuery: PaginationQueryDto,
    @Filters() filters: FilterQueryDto,
    @Sort() sortFilters: SortQueryDto
  ): Promise<TicketResponseDto> {
    try {
        return await this.ticketService.getUserTickets(user, paginationQuery, filters, sortFilters)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createTicket(
    @UserDecorator(['user']) user: User,  
    @TicketDecorator('body') ticketData: TicketCreateDto
  ) : Promise<Ticket> {
    try {
        return await this.ticketService.createTicketForUser(user, ticketData)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateTicket(
    @Param('id') ticketId: number,
    @UserDecorator(['id']) userId: number,
    @TicketDecorator('body') updateData: TicketUpdateDto 
  ) : Promise<Ticket> {
    try{
      return await this.ticketService.updateTicket(userId, ticketId, updateData)
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/status')
  async changeStatus(
    @Param('id') ticketId: number,
    @UserDecorator(['id']) userId: number,
    @TicketDecorator('body') ticketStatus: TicketChangeStatusDto 
  ) : Promise<Ticket> {
    try{
      const status: TicketStatus = ticketStatus.status
      const updateData: TicketUpdateDto = {status}
      return await this.ticketService.updateTicket(userId, ticketId,  updateData)
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteTicket(
    @Param('id') ticketId : number,
    @UserDecorator(['id']) userData : {id:number}
  ) : Promise<Ticket> {
    try{
      const {id:userId} = userData
      return await this.ticketService.deleteTicket( userId, ticketId)
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
