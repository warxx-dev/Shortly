// src/auth/decorators/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../interfaces/user.interface';
import { Request } from 'express';

export const UserD = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as AuthUser;
  },
);
