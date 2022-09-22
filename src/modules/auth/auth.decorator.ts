import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRoles } from '@/modules/user/user.roles';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const ROLES_KEY = Symbol('role');

/**
 * @description 装饰器聚合
 * @see https://docs.nestjs.com/custom-decorators#decorator-composition
 */
export const Roles = (...roles: UserRoles[]) => applyDecorators(
  SetMetadata(ROLES_KEY, roles),
  UseGuards(JwtGuard, RoleGuard),
);
