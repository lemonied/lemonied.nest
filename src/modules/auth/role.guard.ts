import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POWER_KEY } from './auth.decorator';
import { JwtPayload } from '@/modules/auth';
import { RoleTypes } from '@/modules/role';

@Injectable()
class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}
  canActivate(context: ExecutionContext) {
    const requiredPower = this.reflector.getAllAndOverride<boolean>(POWER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPower) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user as JwtPayload;
    return user.roles.includes(RoleTypes.SuperAdmin);
  }
}

export { RoleGuard };
