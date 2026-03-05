"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.deleteType = exports.TicketStatus = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["CREATED"] = 201] = "CREATED";
    HttpStatus[HttpStatus["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatus[HttpStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatus[HttpStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatus[HttpStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatus[HttpStatus["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatus || (exports.HttpStatus = HttpStatus = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "in_progress";
    TicketStatus["RESOLVED"] = "resolved";
    TicketStatus["CLOSED"] = "closed";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
var deleteType;
(function (deleteType) {
    deleteType["hard"] = "hard_delete";
    deleteType["soft"] = "soft_delete";
})(deleteType || (exports.deleteType = deleteType = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["USER"] = "user";
    UserRoles["ADMIN"] = "admin";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
//# sourceMappingURL=static.js.map