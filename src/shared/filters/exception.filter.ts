import { ArgumentsHost, Catch, ExceptionFilter as NestExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
class ExceptionFilter implements NestExceptionFilter {
  constructor(
    private httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: any, host: ArgumentsHost): any {
    const { httpAdapter } = this.httpAdapterHost;
    const httpArgumentsHost = host.switchToHttp();
    if (exception) {

    }
    httpAdapter.reply(httpArgumentsHost.getResponse(), {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'INTERNAL_SERVER_ERROR',
      message: String(exception),
    });
  }
}

export { ExceptionFilter };
