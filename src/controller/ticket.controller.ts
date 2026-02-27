import { Body, Controller, Delete, Get, HttpException, Patch, Post, Req } from '@nestjs/common';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { Ticket } from 'src/entity/ticket.entity';
import { User } from 'src/entity/user.entity';
import { TicketService } from 'src/services/ticket.service';
import { HttpStatus } from 'src/static';

@Controller('ticket')
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

  @Get('all')
  async getAllTickets(@Req() user: User): Promise<Ticket[]> {
    try {
        return await this.ticketService.getAllTicketsByUser(user)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('create')
  async createTicket(@Req() user: User,  @Body() ticketData: TicketCreateDto) : Promise<Ticket> {
    try {
        return await this.ticketService.createTicketForUser(user, ticketData)
    }catch(err){
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('create')
  async changeStatus() {
    // Implement ticket creation logic here
  }

  @Delete('create')
  async deleteTicket() {
    // Implement ticket creation logic here
  }

}
