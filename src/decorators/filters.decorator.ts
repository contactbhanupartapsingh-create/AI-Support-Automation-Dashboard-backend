import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { FilterQueryDto } from 'src/dto/filterQuery.dto';

export const Filters = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    // if (query.status) {
    //   query.status = Array.isArray(query.status) ? query.status : [query.status];
    // }

    const dto = plainToInstance(FilterQueryDto,query)

    const errors = validateSync(dto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return dto
  },
);