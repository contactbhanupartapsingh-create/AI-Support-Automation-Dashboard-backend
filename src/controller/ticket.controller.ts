import { Controller, Delete, Get, HttpException, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketService } from 'src/services/ticket.service';
import { HttpStatus } from 'src/static';
import { UserDecorator } from 'src/decorators/user.decorator';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { TicketDecorator } from 'src/decorators/ticket.decorator';
import { Pagination } from 'src/decorators/pagination.decorator';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';
import { TicketResponseDto } from 'src/dto/getTicketResponse.dto';

@UseGuards(AuthGuard)
@Controller('/ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getUserTickets(@UserDecorator(['user']) user: User, @Pagination() paginationQuery: PaginationQueryDto): Promise<TicketResponseDto> {
    try {
        return await this.ticketService.getUserTickets(user, paginationQuery)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('trash')
  async getTrashTicketsByUser(@UserDecorator(['user']) user: User, @Pagination() paginationQuery: PaginationQueryDto): Promise<TicketResponseDto> {
    try {
        return await this.ticketService.getUserTickets(user, paginationQuery, true)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create')
  async createTicket(@UserDecorator(['user']) user: User,  @TicketDecorator('body') ticketData: TicketCreateDto) : Promise<Ticket> {
    try {
        return await this.ticketService.createTicketForUser(user, ticketData)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('updateStatus')
  async changeStatus(@UserDecorator(['id']) userId: number,@TicketDecorator('body') ticketData: TicketChangeStatusDto ) : Promise<Ticket> {
    try{
      return await this.ticketService.changeTicketStatus(userId, ticketData)
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete')
  async deleteTicket(@UserDecorator(['id']) userData : {id:number},@TicketDecorator('body') deleteData: TicketDeleteDto) : Promise<Ticket> {
    try{
      const {id:userId} = userData
      return await this.ticketService.deleteTicket( userId, deleteData)
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
