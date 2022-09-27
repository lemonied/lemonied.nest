import { HttpException, HttpStatus } from '@nestjs/common';

export class ExpiredException extends HttpException {
  constructor(
    response: string | Record<string, any> = 'expired authentication',
    status: HttpStatus = HttpStatus.UNAUTHORIZED,
  ) {
    super(response, status);
  }
}
