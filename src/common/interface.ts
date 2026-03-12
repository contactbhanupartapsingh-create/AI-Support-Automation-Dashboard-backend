import { FilterQueryDto } from "src/dto/filterQuery.dto";
import { PaginationQueryDto } from "src/dto/paginationQuery.dto";
import { SortQueryDto } from "src/dto/sortQuery.dto";

export interface CacheKeyProperties {
    userId: number,
    paginationQuery: PaginationQueryDto,
    filters: FilterQueryDto,
    sortFilters: SortQueryDto
}

export interface CacheKeyDeleteProperties {
    userId?: number,
    paginationQuery?: PaginationQueryDto,
    filters?: FilterQueryDto,
    sortFilters?: SortQueryDto
}
