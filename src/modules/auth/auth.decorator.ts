import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const POWER_KEY = Symbol('power');
/**
 * @description 装饰器聚合
 * @see https://docs.nestjs.com/custom-decorators#decorator-composition
 */
export const Power = () => applyDecorators(
  SetMetadata(POWER_KEY, true),
  UseGuards(JwtGuard, RoleGuard),
);
