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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const static_1 = require("../static");
const ticket_entity_1 = require("../entity/ticket.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TicketService = class TicketService {
    ticketRepository;
    async getUserTickets(user, getDeleted = false) {
        return await this.ticketRepository.find({
            where: {
                user: { id: user.id },
                deletedAt: getDeleted ? (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) : (0, typeorm_2.IsNull)()
            },
            withDeleted: getDeleted,
            relations: {
                user: true
            }
        }).then(async (data) => {
            return data;
        }).catch((err) => {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async createTicketForUser(user, ticketData) {
        const newTicket = this.ticketRepository.create({
            ...ticketData,
            user: user
        });
        try {
            return await this.ticketRepository.save(newTicket);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changeTicketStatus(userId, ticketData) {
        try {
            const { id, status } = ticketData;
            const ticket = await this.ticketRepository.findOne({
                where: { id },
                relations: ['user']
            });
            if (!ticket)
                throw new common_1.HttpException(`ticket id: ${id}not found`, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
            if (ticket.user.id != userId)
                throw new common_1.HttpException(` user not authorized to access this ticket`, static_1.HttpStatus.UNAUTHORIZED);
            ticket.status = status;
            this.ticketRepository.save(ticket);
            return ticket;
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTicket(userId, ticketDeleteData) {
        try {
            const { id: ticketId } = ticketDeleteData;
            const ticket = await this.ticketRepository.findOne({
                where: { id: ticketId },
                relations: ['user']
            });
            if (!ticket)
                throw new common_1.HttpException(`ticket with id: ${ticketId} not found`, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
            if (ticket.user.id != userId)
                throw new common_1.HttpException(`user with id: ${userId} have no access over ticket with id ${ticketId}`, static_1.HttpStatus.UNAUTHORIZED);
            if (ticket.deletedAt)
                throw new common_1.HttpException(`ticket with id: ${ticketId} is already deleted`, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return await this.ticketRepository.softRemove(ticket);
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllTickets(getDeleted) {
        return await this.ticketRepository.find({
            withDeleted: getDeleted
        }).then(async (data) => {
            return data;
        }).catch((err) => {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
    async restoreTicket(ticketId) {
        try {
            const ticket = await this.ticketRepository.find({
                where: {
                    id: ticketId
                },
                withDeleted: true
            });
            if (!ticket)
                throw new common_1.NotFoundException(`Ticket with id : ${ticketId} not found`);
            if (ticket[0] && !ticket[0].deletedAt)
                throw new common_1.HttpException(`Ticket with id : ${ticketId} is not deleted or already restored`, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
            await this.ticketRepository.restore({
                id: ticketId
            });
            return await this.ticketRepository.findOneBy({ id: ticketId });
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteTicketByAdmin(ticketDeleteData) {
        try {
            const { id, type } = ticketDeleteData;
            const ticket = await this.ticketRepository.findOne({
                where: { id },
                relations: ['user']
            });
            if (!ticket)
                throw new common_1.HttpException(`ticket id: ${id} not found`, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
            if (type == static_1.deleteType.soft) {
                return await this.ticketRepository.softRemove(ticket);
            }
            else {
                this.ticketRepository.remove(ticket);
                return ticket;
            }
        }
        catch (err) {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TicketService = TicketService;
__decorate([
    (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket),
    __metadata("design:type", typeorm_2.Repository)
], TicketService.prototype, "ticketRepository", void 0);
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)()
], TicketService);
//# sourceMappingURL=ticket.service.js.map