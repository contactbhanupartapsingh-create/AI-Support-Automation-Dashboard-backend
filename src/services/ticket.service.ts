import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { deleteType, HttpStatus, SortOrder, TicketSortFields } from 'src/common/enums';
import { Ticket } from 'src/entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketDeleteAdminDto } from 'src/dto/ticketDeleteAdmin.dto';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';
import { TicketResponseDto } from 'src/dto/getTicketResponse.dto';
import { FilterQueryDto } from 'src/dto/filterQuery.dto';
import { TicketUpdateDto } from 'src/dto/ticketUpdate.dto';
import { SortQueryDto } from 'src/dto/sortQuery.dto';

@Injectable()
export class TicketService {
  @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>


  async getUserTickets(
    user: User,
    paginationQuery: PaginationQueryDto,
    filters: FilterQueryDto,
    sortFilters: SortQueryDto
  ): Promise<TicketResponseDto> {
    const { skip, limit, page } = paginationQuery
    const { status, getDeleted } = filters
    const { sortBy = TicketSortFields.CREATED_AT, order = SortOrder.DESC } = sortFilters
    return await this.ticketRepository.findAndCount({
      withDeleted: getDeleted,
      where: {
        user: { id: user.id },
        deletedAt: getDeleted ? Not(IsNull()) : IsNull()
      },
      ...(status && { status: In(status) }),
      relations: {
        user: true
      },
      order: {
        [sortBy]: order
      },
      take: limit,
      skip
    }).then(async (data) => {
      console.log(data,'ssnksl')
      return {
        'tickets': data[0],
        'meta': {
          'totalItems': data[1],
          'totalPages': Math.ceil(data[1] / limit),
          'currentPage': page,
          'sortBy': sortBy,
          'order': order,
          'filters': filters
        }
      }
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

  async updateTicket(
    userId: number,
    ticketId: number,
    updateData: TicketUpdateDto
  ): Promise<Ticket> {
    try {
      const { status, title, description } = updateData

      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
        relations: ['user']
      })

      if (!ticket) throw new HttpException(`ticket id: ${ticketId}not found`, HttpStatus.INTERNAL_SERVER_ERROR)
        console.log(ticket.user.id, userId,'dndjdk')
      if (ticket.user.id != userId) throw new HttpException(` user not authorized to access this ticket`, HttpStatus.UNAUTHORIZED)

      ticket.title = title ?? ticket.title
      ticket.description = description ?? ticket.description
      ticket.status = status ?? ticket.status

      this.ticketRepository.save(ticket)

      return ticket

    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteTicket(
    userId: number,
    ticketId: number
  ): Promise<Ticket> {
    try {
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

  async getAllTickets(
    filters: FilterQueryDto,
    paginationQuery: PaginationQueryDto,
    sortFilters: SortQueryDto
  ): Promise<TicketResponseDto> {
    const { page, limit, skip } = paginationQuery
    const { getDeleted, status } = filters
    const { sortBy = TicketSortFields.CREATED_AT, order = SortOrder.DESC } = sortFilters
    try {
      const tickets = await this.ticketRepository.findAndCount({
        withDeleted: getDeleted,
        ...(status && { status: In(status) }),
        order: {
          [sortBy]: order
        },
        take: limit,
        skip,
      })

      return {
        'tickets': tickets[0],
        'meta': {
          'totalItems': tickets[1],
          'totalPages': Math.ceil(tickets[1] / limit),
          'currentPage': page,
          'sortBy': sortBy,
          'order': order,
          'filters': filters
        }
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
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

  async deleteTicketByAdmin(ticketDeleteData: TicketDeleteAdminDto, ticketId: number): Promise<Ticket> {
    try {
      const { type } = ticketDeleteData
      const ticket = await this.ticketRepository.findOne({
        where: { id: ticketId },
        relations: ['user']
      })

      if (!ticket) throw new HttpException(`ticket id: ${ticketId} not found`, HttpStatus.INTERNAL_SERVER_ERROR)

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
