import { Injectable, ValidationPipe as NestValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { validate } from 'class-validator';
import { VALIDATION_OPTION } from '@/shared/decorators';

@Injectable()
class ValidationPipe extends NestValidationPipe {
  protected validate(object: object, validatorOptions?: ValidationPipeOptions) {
    const overrideOptions = Reflect.getMetadata(VALIDATION_OPTION, object.constructor) as ValidationPipeOptions;
    return validate(object, { ...validatorOptions, ...overrideOptions });
  }
}

export { ValidationPipe };
