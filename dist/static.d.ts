export declare enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}
export declare enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export declare enum deleteType {
    hard = "hard_delete",
    soft = "soft_delete"
}
export declare enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}
export type PaginationMeta = {
    totalItems: number;
    totalPages: number;
    currentPage: number;
};
