import { IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class ReqPaginationDTO {
  @IsOptional()
  @IsNumber()
  public limit?: number;

  @IsOptional()
  @IsNumber()
  public offset?: number;
}

export class ResPaginationDTO<T=any> {
  @Expose()
  public data: T[];

  @Expose()
  public total: number;

  @Expose()
  public limit: number;

  @Expose()
  public offset: number;
}
