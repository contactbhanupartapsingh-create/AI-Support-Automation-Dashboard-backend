"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.UserDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    let requiredData = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i] == 'user') {
            requiredData = { ...requiredData, ...request.user };
        }
        else {
            requiredData = { ...requiredData, [data[i]]: request.user[data[i]] };
        }
    }
    return requiredData;
});
//# sourceMappingURL=user.decorator.js.map