import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PaginationQueryDto } from 'src/dto/paginationQuery.dto';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const dto = plainToInstance(PaginationQueryDto,{
      page,
      limit,
      skip,
    })

    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return dto
  },
);