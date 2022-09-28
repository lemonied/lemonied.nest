import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestContext } from '@mikro-orm/core';
import { isObservable, lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { UserEntity } from '@/entities';

@Injectable()
class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const canActive = super.canActivate(context);
    const handle = isObservable(canActive) ? lastValueFrom(canActive) : Promise.resolve(canActive);
    const em = RequestContext.getEntityManager();
    return handle.then(bool => {
      const request: Request = context.switchToHttp().getRequest();
      console.log(request.originalUrl, request.baseUrl, request.url, request.path, request.route);
      const user = request.user as UserEntity;
      em && em.setFilterParams('userRef', user ? { id: user.id } : undefined);
      return bool;
    });
  }
}

export { JwtGuard };
