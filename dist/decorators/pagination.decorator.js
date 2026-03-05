"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const paginationQuery_dto_1 = require("../dto/paginationQuery.dto");
exports.Pagination = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const dto = (0, class_transformer_1.plainToInstance)(paginationQuery_dto_1.PaginationQueryDto, {
        page,
        limit,
        skip,
    });
    const errors = (0, class_validator_1.validateSync)(dto);
    if (errors.length > 0) {
        throw new common_1.BadRequestException(errors);
    }
    return dto;
});
//# sourceMappingURL=pagination.decorator.js.map