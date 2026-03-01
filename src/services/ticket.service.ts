import { HttpException, Injectable } from '@nestjs/common';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { deleteType, HttpStatus, TicketStatus } from 'src/static';
import { Ticket } from 'src/entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { identity } from 'rxjs';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';

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

  async changeTicketStatus(userId: number, ticketData: TicketChangeStatusDto): Promise<Ticket> {
    try{
      const {id, status} = ticketData

      const ticket = await this.ticketRepository.findOne({
        where:{id},
        relations: ['user']
      })

      if(!ticket) throw new HttpException(`ticket id: ${id}not found`, HttpStatus.INTERNAL_SERVER_ERROR)

      if(ticket.user.id != userId) throw new HttpException(` user not authorized to access this ticket`, HttpStatus.UNAUTHORIZED)

      ticket.status = status
      this.ticketRepository.save(ticket)
      return ticket

    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteTicket(userId: number, ticketDeleteData: TicketDeleteDto) : Promise<Ticket> {
    try{
      const {id, type} = ticketDeleteData
      const ticket = await this.ticketRepository.findOne({
        where:{id},
        relations: ['user']
      })
      
      if(!ticket) throw new HttpException(`ticket id: ${id}not found`, HttpStatus.INTERNAL_SERVER_ERROR)

      if(ticket.user.id != userId) throw new HttpException(`User is not authorized to access this ticket`, HttpStatus.UNAUTHORIZED)

      if(type == deleteType.soft){
        ticket.isDeleted = true
        if(ticket){
          this.ticketRepository.save(ticket)
          return ticket
        } 
        throw new HttpException(`ticket id: ${id}not found or user not authorized`, HttpStatus.INTERNAL_SERVER_ERROR)
      }else{
        this.ticketRepository.remove(ticket)
        return ticket;
      }
    }catch(err){
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
