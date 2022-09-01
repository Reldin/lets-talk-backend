import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppUser } from './dao/appuser.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): AppUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
