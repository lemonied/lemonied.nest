import { Expose } from 'class-transformer';

export class SystemInfo {
  @Expose()
  public initial: boolean;

  constructor(data: Partial<SystemInfo>) {
    Object.assign(this, data);
  }

}
