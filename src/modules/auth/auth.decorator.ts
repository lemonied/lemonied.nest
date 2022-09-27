import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { AccessGuard } from './access.guard';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const ACCESS_KEY = Symbol('access');
/**
 * @description 装饰器聚合
 * @see https://docs.nestjs.com/custom-decorators#decorator-composition
 */
export const Access = (...roles: string[]) => applyDecorators(
  SetMetadata(ACCESS_KEY, roles),
  UseGuards(JwtGuard, AccessGuard),
);
