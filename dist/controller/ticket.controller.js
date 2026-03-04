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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticketCreate_dto_1 = require("../dto/ticketCreate.dto");
const user_entity_1 = require("../entity/user.entity");
const ticket_service_1 = require("../services/ticket.service");
const static_1 = require("../static");
const user_decorator_1 = require("../decorators/user.decorator");
const ticketChangeStatus_dto_1 = require("../dto/ticketChangeStatus.dto");
const ticketDelete_dto_1 = require("../dto/ticketDelete.dto");
const auth_guard_1 = require("../guards/auth.guard");
const ticket_decorator_1 = require("../decorators/ticket.decorator");
let TicketController = class TicketController {
    ticketService;
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    async getUserTickets(user) {
        try {
            return await this.ticketService.getUserTickets(user);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTrashTicketsByUser(user) {
        try {
            return await this.ticketService.getUserTickets(user, true);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createTicket(user, ticketData) {
        try {
            return await this.ticketService.createTicketForUser(user, ticketData);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changeStatus(userId, ticketData) {
        try {
            return await this.ticketService.changeTicketStatus(userId, ticketData);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTicket(userData, deleteData) {
        try {
            const { id: userId } = userData;
            return await this.ticketService.deleteTicket(userId, deleteData);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.UserDecorator)(['user'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getUserTickets", null);
__decorate([
    (0, common_1.Get)('trash'),
    __param(0, (0, user_decorator_1.UserDecorator)(['user'])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "getTrashTicketsByUser", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, user_decorator_1.UserDecorator)(['user'])),
    __param(1, (0, ticket_decorator_1.TicketDecorator)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, ticketCreate_dto_1.TicketCreateDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "createTicket", null);
__decorate([
    (0, common_1.Patch)('updateStatus'),
    __param(0, (0, user_decorator_1.UserDecorator)(['id'])),
    __param(1, (0, ticket_decorator_1.TicketDecorator)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ticketChangeStatus_dto_1.TicketChangeStatusDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, user_decorator_1.UserDecorator)(['id'])),
    __param(1, (0, ticket_decorator_1.TicketDecorator)('body')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ticketDelete_dto_1.TicketDeleteDto]),
    __metadata("design:returntype", Promise)
], TicketController.prototype, "deleteTicket", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('/ticket'),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
//# sourceMappingURL=ticket.controller.js.map