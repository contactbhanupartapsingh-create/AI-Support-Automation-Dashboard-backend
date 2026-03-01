import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TicketDeleteDto } from 'src/dto/ticketDelete.dto';

export const TicketDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return plainToInstance(TicketDeleteDto, request[data]) 
  },
);