import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from 'src/controller/ticket.controller';
import { Ticket } from 'src/entity/ticket.entity';
import { TicketService } from 'src/services/ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}