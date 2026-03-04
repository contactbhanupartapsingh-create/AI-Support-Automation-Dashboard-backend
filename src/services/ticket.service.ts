import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { deleteType, HttpStatus} from 'src/static';
import { Ticket } from 'src/entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketChangeStatusDto } from 'src/dto/ticketChangeStatus.dto';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';
import { TicketDeleteAdminDto } from 'src/dto/ticketDeleteAdmin.dto';

@Injectable()
export class TicketService {
  @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>


  async getUserTickets(user: User, getDeleted: boolean = false): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      where: {
        user: { id: user.id },
        deletedAt: getDeleted ? Not(IsNull()) : IsNull()
      },
      withDeleted:getDeleted,
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

  async deleteTicket(userId: number, ticketDeleteData: TicketDeleteDto): Promise<Ticket> {
    try {
      const { id: ticketId } = ticketDeleteData
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
        relations: ['user']
      })

      if (!ticket) throw new HttpException(`ticket with id: ${ticketId} not found`, HttpStatus.INTERNAL_SERVER_ERROR)

      if (ticket.user.id != userId) throw new HttpException(`user with id: ${userId} have no access over ticket with id ${ticketId}`, HttpStatus.UNAUTHORIZED)

      if (ticket.deletedAt) throw new HttpException(`ticket with id: ${ticketId} is already deleted`, HttpStatus.INTERNAL_SERVER_ERROR)

      return await this.ticketRepository.softRemove(ticket)

    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  //**********************************************admin logic******************************************** */

  async getAllTickets(getDeleted : boolean): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      withDeleted:getDeleted
    }).then(async (data) => {
      return data
    }).catch((err) => {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    })
  }
  
  async restoreTicket(ticketId: number): Promise<Ticket | null> {
    try {
      const ticket = await this.ticketRepository.find({
        where: {
          id: ticketId
        },
        withDeleted: true
      })

      if (!ticket) throw new NotFoundException(`Ticket with id : ${ticketId} not found`)

      if (ticket[0] && !ticket[0].deletedAt) throw new HttpException(`Ticket with id : ${ticketId} is not deleted or already restored`, HttpStatus.INTERNAL_SERVER_ERROR)

      await this.ticketRepository.restore({
        id: ticketId
      })

      return await this.ticketRepository.findOneBy({ id: ticketId })

    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteTicketByAdmin(ticketDeleteData: TicketDeleteAdminDto): Promise<Ticket> {
    try {
      const { id, type } = ticketDeleteData
      const ticket = await this.ticketRepository.findOne({
        where: { id },
        relations: ['user']
      })

      if (!ticket) throw new HttpException(`ticket id: ${id} not found`, HttpStatus.INTERNAL_SERVER_ERROR)

      if (type == deleteType.soft) {
        return await this.ticketRepository.softRemove(ticket)
      } else {
        this.ticketRepository.remove(ticket)
        return ticket;
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
