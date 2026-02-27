import { HttpException, Injectable } from '@nestjs/common';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { HttpStatus, TicketStatus } from 'src/static';
import { Ticket } from 'src/entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { identity } from 'rxjs';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';

@Injectable()
export class TicketService {
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>
  

  async getAllTicketsByUser(user : User): Promise<Ticket[]> {
    return await this.ticketRepository.find({
        where: {
            user: {id: user.id}
        },
        relations:{
            user: true
        }
    }).then(async (data) => {
      return data
    }).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR); 
    })
  }

  async createTicketForUser(user: User, ticketData: TicketCreateDto): Promise<Ticket> {
    const newTicket = this.ticketRepository.create({
      ...ticketData,
      user: user
    })

    try{
      return await this.ticketRepository.save(newTicket)
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async changeTicketStatus(id: number, status: TicketStatus): Promise<Ticket> {
    try{
      const ticket = await this.ticketRepository.preload({
        id: id,
        status,
      })
      if(ticket) return ticket
      throw new HttpException(`ticket id: ${id}not found`, HttpStatus.INTERNAL_SERVER_ERROR)
      
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
