import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let requiredData = {}
 
    for(let i =0;i<data.length; i++){
      if(data[i] == 'user'){
        if(data.length == 1) return request.user
        requiredData = {...requiredData, ...request.user}
      }else{
        if(data.length == 1) return request.user[data[0]]
        requiredData = {...requiredData, [data[i]]:request.user[data[i]]}
      }
    }
    return requiredData
  },
);