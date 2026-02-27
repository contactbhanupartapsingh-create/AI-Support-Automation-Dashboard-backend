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
    async getAllTicketsByUser(user) {
        return await this.ticketRepository.find({
            where: {
                user: { id: user.id }
            },
            relations: {
                user: true
            }
        }).then(async (data) => {
            return data;
        }).catch((err) => {
            throw new common_1.HttpException(err, static_1.HttpStatus.INTERNAL_SERVER_ERROR);
        });
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