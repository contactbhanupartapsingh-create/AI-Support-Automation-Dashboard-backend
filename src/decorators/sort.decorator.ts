import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { FilterQueryDto } from 'src/dto/filterQuery.dto';
import { SortQueryDto } from 'src/dto/sortQuery.dto';

export const Sort = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const dto = plainToInstance(SortQueryDto,query)

    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return dto
  },
);