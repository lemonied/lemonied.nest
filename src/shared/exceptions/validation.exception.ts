import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends HttpException {
  constructor(
    private readonly errors: Array<ValidationError>,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(errors, status);
  }
}
