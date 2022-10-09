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
  data: T[];

  @Expose()
  total: number;

  @Expose()
  limit: number;

  @Expose()
  offset: number;
}
