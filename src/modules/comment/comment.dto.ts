import { IsString } from 'class-validator';
import { ReqPaginationDTO, ResPaginationDTO } from '@/orm';

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
  constructor(data: ResponseCommentDTO) {
    super();
    Object.assign(this, data);
  }
}


