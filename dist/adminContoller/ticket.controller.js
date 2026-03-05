"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTicketController = void 0;
const common_1 = require("@nestjs/common");
const pagination_decorator_1 = require("../decorators/pagination.decorator");
const roles_decorator_1 = require("../decorators/roles.decorator");
const ticket_decorator_1 = require("../decorators/ticket.decorator");
const paginationQuery_dto_1 = require("../dto/paginationQuery.dto");
const ticketDeleteAdmin_dto_1 = require("../dto/ticketDeleteAdmin.dto");
const ticketRestore_dto_1 = require("../dto/ticketRestore.dto");
const auth_guard_1 = require("../guards/auth.guard");
const role_guard_1 = require("../guards/role.guard");
const ticket_service_1 = require("../services/ticket.service");
const static_1 = require("../static");
let AdminTicketController = class AdminTicketController {
    ticketService;
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async getAllTickets(getDeleted, paginationQuery) {
        try {
            return await this.ticketService.getAllTickets(getDeleted, paginationQuery);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTicket(deleteData) {
        try {
            return await this.ticketService.deleteTicketByAdmin(deleteData);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restoreTicket(restoreData) {
        try {
            return await this.ticketService.restoreTicket(restoreData.id);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AdminTicketController = AdminTicketController;
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)('getDeleted')),
    __param(1, (0, pagination_decorator_1.Pagination)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, paginationQuery_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], AdminTicketController.prototype, "getAllTickets", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, ticket_decorator_1.TicketDecorator)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticketDeleteAdmin_dto_1.TicketDeleteAdminDto]),
    __metadata("design:returntype", Promise)
], AdminTicketController.prototype, "deleteTicket", null);
__decorate([
    (0, common_1.Patch)('restore'),
    __param(0, (0, ticket_decorator_1.TicketDecorator)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticketRestore_dto_1.TicketRestoreDto]),
    __metadata("design:returntype", Promise)
], AdminTicketController.prototype, "restoreTicket", null);
exports.AdminTicketController = AdminTicketController = __decorate([
    (0, common_1.Controller)('/admin/ticket'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(static_1.UserRoles.ADMIN),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], AdminTicketController);
//# sourceMappingURL=ticket.controller.js.map