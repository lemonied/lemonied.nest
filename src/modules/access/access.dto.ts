import { AccessType } from './access.type';
import { Allow } from 'class-validator';

export class AccessListParams {
  @Allow()
  type: AccessType;
}
