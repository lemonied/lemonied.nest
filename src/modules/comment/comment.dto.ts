import { IsString } from 'class-validator';
import { ReqPaginationDTO, ResPaginationDTO } from '@/orm';
import { Expose, Type } from 'class-transformer';
import { CommentEntity } from '@/entities';

export class CreateCommentDTO {
  @IsString()
  public content: string;

  @IsString()
  public belong: string;
}

export class GetCommentDTO extends ReqPaginationDTO {
  @IsString()
  public belong: string;
}

export class ResponseCommentDTO extends ResPaginationDTO {

  @Expose()
  @Type(() => CommentEntity)
  data: any[];

  constructor(data: ResponseCommentDTO) {
    super();
    Object.assign(this, data);
  }
}


