import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserSignInDto } from 'src/dto/userSignIn.dto';
import { deleteType, HttpStatus, TicketStatus, UserRoles } from 'src/static';
import { Ticket } from 'src/entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { identity } from 'rxjs';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';

@Injectable()
export class TicketService {
  @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>


  async getAllTicketsByUser(user: User): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: {
        user: { id: user.id }
      },
      relations: {
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
    try {
      return await this.ticketRepository.save(newTicket)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async changeTicketStatus(userId: number, ticketData: TicketChangeStatusDto): Promise<Ticket> {
    try {
      const { id, status } = ticketData

      const ticket = await this.ticketRepository.findOne({
        where: { id },
        relations: ['user']
      })

      if (!ticket) throw new HttpException(`ticket id: ${id}not found`, HttpStatus.INTERNAL_SERVER_ERROR)

      if (ticket.user.id != userId) throw new HttpException(` user not authorized to access this ticket`, HttpStatus.UNAUTHORIZED)

      ticket.status = status
      this.ticketRepository.save(ticket)
      return ticket

    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteTicket(userId: number, role: UserRoles, ticketDeleteData: TicketDeleteDto): Promise<Ticket> {
    try {
      const { id, type } = ticketDeleteData
      const ticket = await this.ticketRepository.findOne({
        where: { id },
        relations: ['user']
      })

      if (!ticket) throw new HttpException(`ticket id: ${id} not found`, HttpStatus.INTERNAL_SERVER_ERROR)

      if (ticket.user.id != userId) throw new HttpException(`User is not authorized to access this ticket`, HttpStatus.UNAUTHORIZED)

      if (type == deleteType.soft) {
        return await this.ticketRepository.softRemove(ticket)
      } else {
        if (role == UserRoles.ADMIN) {
          this.ticketRepository.remove(ticket)
          return ticket;
        }
        throw new HttpException(`role type ${role} is not authorized for this type of action`, HttpStatus.UNAUTHORIZED)
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async restoreTicket(ticketId: number): Promise<Ticket | null> {
    try {
        const restoreResult = await this.ticketRepository.restore({
          id:ticketId,
          deletedAt:Not(IsNull())
        })

        if(restoreResult.affected == 0){
          throw new NotFoundException(`Ticket with id : ${ticketId} not found or not deleted or already restored`)
        }

        return await this.ticketRepository.findOneBy({id: ticketId})
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
