import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_KEY } from './auth.decorator';
import { UserEntity } from '@/entities';
import { Request } from 'express';

@Injectable()
class AccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const requiredAccess = this.reflector.getAllAndOverride<string[]>(ACCESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredAccess) {
      return true;
    }
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as UserEntity;
    const userRoles = user.roles.toArray().map(v => v.code);
    return requiredAccess.every(role => userRoles.includes(role));
  }
}

export { AccessGuard };
