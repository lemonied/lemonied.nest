import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExpiredException, ValidationException } from '@/shared/exceptions';
import { LOGGER_PROVIDER, LoggerService } from '@/shared/logger';
import { ValidationError, DriverException } from '@mikro-orm/core';
import { Response } from 'express';

interface ErrorBody {
  code?: number;
  error?: any;
  message?: string;
}
class ErrorResponse {
  private code = HttpStatus.INTERNAL_SERVER_ERROR;
  private error: any = null;
  private message = 'UNKNOWN_ERROR';
  public assign(body: ErrorBody) {
    return Object.assign({
      code: this.code,
      error: this.error,
      message: this.message,
    }, body);
  }
}

@Catch()
class ExceptionFilter implements NestExceptionFilter {
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    @Inject(LOGGER_PROVIDER) private log: LoggerService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errRes = new ErrorResponse();
    if (exception instanceof HttpException) {
      const message = exception.message;
      const status = exception.getStatus();
      this.log.error(message, exception.stack, exception.name);
      if (exception instanceof ValidationException) {
        return response.status(status).json(errRes.assign({
          code: status,
          error: exception.errors,
          message,
        }));
      }
      if (exception instanceof ExpiredException) {
        return response.status(status).clearCookie('jwt_token').json(errRes.assign({
          code: status,
          error: message,
          message,
        }));
      }
      return response.status(status).json(errRes.assign({
        code: status,
        error: exception.name,
        message,
      }));
    }
    if (exception instanceof Error) {
      const message = exception.message;
      this.log.error(message, exception.stack, exception.name);
      if (exception instanceof ValidationError) {
        return response.status(HttpStatus.BAD_REQUEST).json(errRes.assign({
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          error: exception.name,
          message,
        }));
      }
      if (exception instanceof DriverException) {
        return response.status(HttpStatus.BAD_REQUEST).json(errRes.assign({
          code: HttpStatus.BAD_REQUEST,
          error: exception.code,
          message: exception.sqlMessage,
        }));
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes.assign({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        error: exception.name,
        message,
      }));
    }
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errRes.assign({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception?.toString?.(),
    }));
  }
}

export { ExceptionFilter };
