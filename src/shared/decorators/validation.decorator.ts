import { SetMetadata, ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_OPTION = Symbol('validation-option');

export const ValidationOptions = (options?: ValidationPipeOptions) => {
  return SetMetadata(VALIDATION_OPTION, options);
};
