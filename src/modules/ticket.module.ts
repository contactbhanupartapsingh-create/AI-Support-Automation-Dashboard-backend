import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminTicketController } from 'src/adminContoller/ticket.controller';
import { TicketController } from 'src/controller/ticket.controller';
import { Ticket } from 'src/entity/ticket.entity';
import { TicketService } from 'src/services/ticket.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketController, AdminTicketController],
  providers: [TicketService]
})
export class TicketModule {}