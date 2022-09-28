import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { isObservable, lastValueFrom } from 'rxjs';
import { RequestContext } from '@mikro-orm/core';
import { Request } from 'express';
import { JwtPayload } from './jwt.payload';

@Injectable()
class LocalGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const canActive = super.canActivate(context);
    const handle = isObservable(canActive) ? lastValueFrom(canActive) : Promise.resolve(canActive);
    const em = RequestContext.getEntityManager();
    return handle.then(bool => {
      const request: Request = context.switchToHttp().getRequest();
      const user = request.user as JwtPayload;
      em && em.setFilterParams('userRef', user ? { id: user.userId } : undefined);
      return bool;
    });
  }
}

export { LocalGuard };
