import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let requiredData = {}
    for(let i =0;i<data.length; i++){
      if(data[i] == 'user'){
        requiredData = {...requiredData, ...request.user}
      }else{
        requiredData = {...requiredData, [data[i]]:request.user[data[i]]}
      }
    }
    return requiredData
  },
);