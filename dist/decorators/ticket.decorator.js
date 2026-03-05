"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketDecorator = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const ticketDelete_dto_1 = require("../dto/ticketDelete.dto");
exports.TicketDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return (0, class_transformer_1.plainToInstance)(ticketDelete_dto_1.TicketDeleteDto, request[data]);
});
//# sourceMappingURL=ticket.decorator.js.map