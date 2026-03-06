export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum TicketStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed',
}

export enum deleteType {
    hard='hard_delete',
    soft='soft_delete'
}

export enum UserRoles {
    USER='user',
    ADMIN='admin'
}

export enum TicketSortFields {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt'
}

export enum SortOrder {
    ASC='ASC',
    DESC='DESC'
}
