import { RequestContext } from '@mikro-orm/core';

const userId = new WeakMap<RequestContext, number>();
export const getUserId = (): number | undefined => {
  return userId.get(RequestContext.currentRequestContext());
};
export const setUserId = (user: number) => {
  userId.set(RequestContext.currentRequestContext(), user);
};
