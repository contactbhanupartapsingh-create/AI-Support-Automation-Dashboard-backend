import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { deleteType, HttpStatus, SortOrder, TicketSortFields } from 'src/common/enums';
import { Ticket } from 'src/entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { TicketCreateDto } from 'src/dto/ticketCreate.dto';
import { TicketDeleteAdminDto } from 'src/dto/ticketDeleteAdmin.dto';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';
import { TicketResponseDto } from 'src/dto/getTicketResponse.dto';
import { FilterQueryDto } from 'src/dto/filterQuery.dto';
import { TicketUpdateDto } from 'src/dto/ticketUpdate.dto';
import { SortQueryDto } from 'src/dto/sortQuery.dto';
import { generateCacheKey } from 'src/common/functions';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Injectable()
export class TicketService {
  @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>
  constructor(
    private readonly cacheService: CacheService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }


  async getUserTickets(
    user: User,
    paginationQuery: PaginationQueryDto,
    filters: FilterQueryDto,
    sortFilters: SortQueryDto
  ): Promise<TicketResponseDto> {

    const userId = user.id
    const cachedResponse = await this.cacheService.validateResponse(
      {
        userId,
        paginationQuery,
        filters,
        sortFilters
      }
    )
    if (cachedResponse) return cachedResponse

    const { skip, limit, page, search } = paginationQuery
    const { status, getDeleted } = filters
    const { sortBy = TicketSortFields.CREATED_AT, order = SortOrder.DESC } = sortFilters

    const queryBuilder = this.ticketRepository.createQueryBuilder('ticket')

    // apply relations
    queryBuilder.leftJoinAndSelect(`ticket.user`, 'user')
      .where(`user.id = :userId`, { userId: user.id })


    // apply filters
    if (getDeleted) queryBuilder.withDeleted().andWhere('ticket.deletedAt IS NOT NULL')
    if (status && status.length) queryBuilder.andWhere('ticket.status IN (:...status)', { status })

    // apply sort filters and search
    if (search) {
      const prefixSearch = search
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(word => `${word}:*`)
        .join(' & ');
      queryBuilder.andWhere(
        "ticket.searchVector @@ to_tsquery('english', :search)",
        { search: prefixSearch }
      );
      queryBuilder.addSelect(
        "ts_rank(ticket.searchVector, to_tsquery('english', :search))",
        "rank"
      );
      queryBuilder.orderBy("rank", "DESC");
    } else {
      queryBuilder.orderBy(`ticket.${sortBy}`, order)
    }


    try {
      // with pagination
      const [tickets, totalItems] = await queryBuilder
        .take(limit)
        .skip(skip)
        .getManyAndCount();

      const response = {
        tickets,
        'meta': {
          'totalItems': totalItems,
          'totalPages': Math.ceil(totalItems / limit),
          'currentPage': page,
          'sortBy': sortBy,
          'order': order,
          'filters': filters
        }
      }

      await this.cacheManager.set(generateCacheKey(
        userId,
        paginationQuery,
        filters,
        sortFilters
      ), response)

      return response
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createTicketForUser(user: User, ticketData: TicketCreateDto): Promise<Ticket> {
    const newTicket = this.ticketRepository.create({
      ...ticketData,
      user: user
    })
    try {
      const ticket = await this.ticketRepository.save(newTicket)
      const userId = user.id
      await this.cacheService.invalidateTickets({userId})
      return ticket
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
      
      if (ticket.user.id != userId) throw new HttpException(` user not authorized to access this ticket`, HttpStatus.UNAUTHORIZED)

      ticket.title = title ?? ticket.title
      ticket.description = description ?? ticket.description
      ticket.status = status ?? ticket.status

      this.ticketRepository.save(ticket)
      await this.cacheService.invalidateTickets({userId})

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

      await this.cacheService.invalidateTickets({userId})
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
    const userId = 0
    const cachedResponse = await this.cacheService.validateResponse(
      {
        userId,
        paginationQuery,
        filters,
        sortFilters
      }
    )
    if (cachedResponse) return cachedResponse

    const { page, limit, skip, search } = paginationQuery
    const { getDeleted, status } = filters
    const { sortBy = TicketSortFields.CREATED_AT, order = SortOrder.DESC } = sortFilters

    const queryBuilder = this.ticketRepository.createQueryBuilder('ticket')

    // filters
    if (getDeleted) queryBuilder.withDeleted()
    if (status && status.length) queryBuilder.andWhere('ticket.status IN (:...status)', { status })

    // order and search
    if (search) {
      const prefixSearch = search
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(word => `${word}:*`)
        .join(' & ');
      queryBuilder.andWhere(
        "ticket.searchVector @@ to_tsquery('english', :search)",
        { search: prefixSearch }
      );
      queryBuilder.addSelect(
        "ts_rank(ticket.searchVector, to_tsquery('english', :search))",
        "rank"
      );
      queryBuilder.orderBy("rank", "DESC");
    } else {
      queryBuilder.orderBy(`ticket.${sortBy}`, order)
    }


    try {
      const [tickets, totalItems] = await queryBuilder
        .take(limit)
        .skip(skip)
        .getManyAndCount()

      const response = {
        tickets,
        'meta': {
          'totalItems': totalItems,
          'totalPages': Math.ceil(totalItems / limit),
          'currentPage': page,
          'sortBy': sortBy,
          'order': order,
          'filters': filters
        }
      }

      await this.cacheManager.set(generateCacheKey(
            0,
            paginationQuery,
            filters,
            sortFilters
        ), response)

      return response
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

      const userId = ticket[0].user.id
      await this.cacheService.invalidateTickets({userId})
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

      const userId = 0
      if (type == deleteType.soft) {
        const response = await this.ticketRepository.softRemove(ticket)
        await this.cacheService.invalidateTickets({userId})
        return response
      } else {
        this.ticketRepository.remove(ticket)
        await this.cacheService.invalidateTickets({userId})
        return ticket;
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
