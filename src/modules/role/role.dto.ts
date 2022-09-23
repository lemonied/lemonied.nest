import { IsString, MaxLength } from 'class-validator';

export class CreateRole {
  @IsString()
  @MaxLength(32)
  readonly name: string;
}
