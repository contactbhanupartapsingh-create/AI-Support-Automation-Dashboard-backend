import { FilterQueryDto } from "src/dto/filterQuery.dto";
import { PaginationQueryDto } from "src/dto/paginationQuery.dto";
import { SortQueryDto } from "src/dto/sortQuery.dto";

export const generateCacheKey = (
    userId: Number,
    paginationQuery: PaginationQueryDto,
    filters: FilterQueryDto,
    sortFilters: SortQueryDto
): string => {
    const paginationPipe = JSON.stringify(paginationQuery)
    const filterPipe = JSON.stringify(filters)
    const sortPipe = JSON.stringify(sortFilters)

    return `tickets:u:${userId}:p:${paginationPipe}:f:${filterPipe}:s:${sortPipe}`;
}
