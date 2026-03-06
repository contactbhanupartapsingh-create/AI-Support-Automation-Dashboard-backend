import { FilterQueryDto } from "src/dto/filterQuery.dto"
import { SortOrder, TicketSortFields } from "./enums"

export type PaginationMeta = {
    totalItems: number,
    totalPages: number,
    currentPage: number,
    sortBy: TicketSortFields,
    order: SortOrder,
    filters: FilterQueryDto
}